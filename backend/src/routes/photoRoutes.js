const { Router } = require("express");
const multer = require("multer");
const multerConfig = require("../config/multer");

const routes = Router();

const authMiddleware = require("../Middleware/auth");
const PhotoController =  require("../controllers/PhotoController");

routes.get("/:id", authMiddleware, PhotoController.show);
routes.post(
  "/",
  authMiddleware,
  multer(multerConfig).single("file"),
  PhotoController.store
);
routes.delete("/:id", authMiddleware, PhotoController.destroy);

module.exports = routes;