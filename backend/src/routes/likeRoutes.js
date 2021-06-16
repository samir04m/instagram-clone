const { Router } = require("express");
const routes = Router();

const authMiddleware = require("../Middleware/auth");
const LikeController = require("../Controllers/LikeController")

routes.post("/:photo", authMiddleware, LikeController.store);

module.exports = routes;