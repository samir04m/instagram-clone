const { Router } = require("express");
const routes = Router();

const authMiddleware = require("../Middleware/auth");

const FeedController =  require("../controllers/FeedController");

routes.use(authMiddleware);

routes.get("/", FeedController.show);
routes.get("/follows", FeedController.showFollow);

module.exports = routes;