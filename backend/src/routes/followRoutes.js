const { Router } = require("express");
const routes = Router();

const authMiddleware = require("../Middleware/auth");
const FollowController = require("../Controllers/FollowController")

routes.post("/:user_id", authMiddleware, FollowController.store);

module.exports = routes;