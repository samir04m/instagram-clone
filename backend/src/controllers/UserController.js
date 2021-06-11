module.exports = {
    async store(request, response) {

        const {name, email, username, password} = request.body;

        response.json(request.body);
        // response.json({username});
    }
};