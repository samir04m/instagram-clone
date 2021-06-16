const { Router } = require("express");
const multer = require("multer");
const multerConfig = require("../config/multer");

const routes = Router();

const authMiddleware = require("../Middleware/auth");
const PhotoController =  require("../controllers/PhotoController");

routes.use(authMiddleware);

routes.get("/:id", PhotoController.show);
routes.post("/", multer(multerConfig).single("file"), PhotoController.store);
routes.delete("/:id", PhotoController.destroy);

module.exports = routes;