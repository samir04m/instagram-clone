const { Router } = require("express");
const routes = Router();

const authMiddleware = require("../Middleware/auth");
const LikeController = require("../Controllers/LikeController")

routes.use(authMiddleware);

routes.post("/:photo", LikeController.store);

module.exports = routes;