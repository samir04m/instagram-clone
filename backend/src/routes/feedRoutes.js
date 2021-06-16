const { Router } = require("express");
const routes = Router();

const authMiddleware = require("../Middleware/auth");

const FeedController =  require("../controllers/FeedController");


routes.get("/", authMiddleware, FeedController.show);
routes.get("/follows", authMiddleware, FeedController.showFollow);

module.exports = routes;