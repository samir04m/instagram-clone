const User = require("../Models/User");


module.exports = {
    async store(request, response) {

        const {name, email, username, password} = request.body;

        const user = await User.create({
            name,
            email,
            username,
            password
        });

        response.json(user);

    }
};