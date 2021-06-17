const { Router } = require("express");
const multer = require("multer");
const multerConfig = require("../config/multer");

const routes = Router();

const authMiddleware = require("../Middleware/auth");
const UserController =  require("../controllers/UserController");
const ValidationsUser = require("../Validations/validationUser");
const SearchController = require("../Controllers/SearchController");

routes.get("/:username", authMiddleware, UserController.show);

routes.post("/", ValidationsUser.withPassword, UserController.store);

routes.put("/", authMiddleware, ValidationsUser.withoutPassword, UserController.update);

routes.put("/password-update", authMiddleware, ValidationsUser.password, UserController.updatePassword);

routes.put("/avatar", authMiddleware, multer(multerConfig).single("file"), UserController.updateAvatar);

routes.get("/search/:term", authMiddleware, SearchController.search);


module.exports = routes;