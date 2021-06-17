const { Router } = require("express");
const routes = Router();

const authMiddleware = require("../Middleware/auth");

const redisMiddleware = require("../Middleware/redis");
const cache_howiam = require("../Middleware/redisCache"); 

const AuthController =  require("../controllers/AuthController");
const ValidationAuth = require("../Validations/validationAuth");

routes.post("/", ValidationAuth.login, AuthController.login);

routes.get(
    "/me",
    authMiddleware,
    redisMiddleware,
    cache_howiam,
    AuthController.howIam
);

module.exports = routes;