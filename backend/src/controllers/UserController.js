module.exports = {
    async store(request, response) {
        response.json({message : "Desde controllador"});
    }
};