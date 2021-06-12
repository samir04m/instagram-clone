const Sequelize = require("sequelize");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../Models/User");

const passwordHash = require("./utils/passwordHash");

module.exports = {

    async show(request, response) {
        response.json({message: "todo bien"});
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

    }
};