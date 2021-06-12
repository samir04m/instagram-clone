const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) return response.status(401).send({ error: "No autorizado" });

    // Bearer asdjahd8asd8a7d9a8sd
    const parts = authHeader.split(" ");

    if (parts.length !== 2)
        return response.status(401).send({ error: "Token error" });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
        return response.status(401).send({ error: "Token mal formateado" });

    jwt.verify(token, process.env.SIGNATURE_TOKEN, (err, decoded) => {
        if (err) return response.status(401).send({ error: "Token invalido" });

        request.userId = decoded.id;
        return next();
    });
};