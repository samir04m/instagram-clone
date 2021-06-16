const Sequelize = require("sequelize");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const User = require("../Models/User");
const Photo = require("../Models/Photo");
const Follow = require("../Models/Follow");

const passwordHash = require("./utils/passwordHash");
const passwordCompare = require("./utils/passwordCompare");

module.exports = {

    async show(request, response) {
      const { username } = request.params;
      const { page, pageSize } = request.query;

      const user = await User.findOne({
          where: { username },
          attributes: {
            exclude: ["password", "updatedAt"]
          },
          include: [
            {
              association: "photoUploads",
              separate: true,
              offset: page * pageSize,
              limit: pageSize 
            }
          ],
          group: ["User.id"]
      });

      if (!user)
        return response.status(404).send({ message: "Usuario no encontrado" });
      
      const count_photos = await Photo.findAll({ where: { user_id: user.id } });
      const count_follows = await Follow.findAll({ where: { user_from: user.id } });
      const count_followers = await Follow.findAll({ where: { user_to: user.id } });
  
      let isProfile = false;
      if (user.id === request.userId) isProfile = true;
  
      let isFollow = await Follow.findOne({
        where: {
          [Sequelize.Op.and]: [{ user_from: request.userId }, { user_to: user.id }]
        }
      });
  
      return response.json({
        user,
        count_photos: count_photos.length,
        count_follows: count_follows.length,
        count_followers: count_followers.length,
        isProfile,
        isFollow: isFollow ? true : false
      });
        
    },


    async store(request, response) {

        const {name, email, username, password} = request.body;

        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        let user = await User.findOne({
            where: { [Sequelize.Op.or]: [{ email }, { username }] }
        });

        if (user) {
            if (user.email === email)
              return response.status(400).json({ message: "Este email ya esta en uso" });
            if (user.username === username)
              return response.status(400).json({ message: "Este usuario ya esta en uso" });
        }

        const passwordHashed = await passwordHash(password);

        user = await User.create({
            name,
            email,
            username,
            password : passwordHashed
        });

        const payload = { id: user.id, username: user.username };
        jwt.sign(
            payload,
            process.env.SIGNATURE_TOKEN,
            { expiresIn: 86400 },
            (error, token) => {
                if (error) throw error;
                return response.json({ token });
            }
        );

    },

    async update(req, res) {
        const { name, email, username, phone, bio } = req.body;
    
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        await User.update(
            {
                name,
                email,
                username,
                phone,
                bio
            },
            { where: { id: req.userId } }
        );
    
        return res.json({ message: "Actualizado correctamente" });
    },

    async updatePassword(req, res) {
        const { password_old, password, password_confirm } = req.body;
    
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    
        const user = await User.findByPk(req.userId);
    
        if (!(await bcryptjs.compare(password_old, user.password)))
          return res
            .status(400)
            .json({ message: "No coincide la contraseña antigua" });
    
        if (password !== password_confirm)
          return res.status(400).json({ message: "Los passwords no son iguales" });
    
        //Hasheando el password
        const salt = await bcryptjs.genSalt(10);
        const passwordHash = await bcryptjs.hash(password, salt);
    
        await User.update(
          {
            password: passwordHash
          },
          { where: { id: req.userId } }
        );
    
        return res.json({ message: "Password actualizado" });
    },

    async updateAvatar(req, res) {
        const { filename: key } = req.file;
    
        promisify(fs.unlink)(
            path.resolve(__dirname, "..", "..", "tmp", "uploads", req.query.key)
        ); // Eliminando el archivo de local
    
        // const url = `http://localhost:3333/files/${key}`;
        const url = `${process.env.APP_URL}/files/${key}`;
        await User.update(
          {
            key,
            avatar_url: url
          },
          { where: { id: req.userId } }
        );
    
        return res.json({ avatar_url: url });
    },
    
};