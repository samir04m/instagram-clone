const { Router } = require("express");
const routes = Router();

const authMiddleware = require("../Middleware/auth");
const FollowController = require("../Controllers/FollowController")

routes.use(authMiddleware);

routes.post("/:user_id", FollowController.store);

module.exports = routes;