const { Router } = require("express");
const multer = require("multer");
const multerConfig = require("./config/multer");

const routes = Router();

const authMiddleware = require("./Middleware/auth");

const UserController =  require("./controllers/UserController");
const AuthController =  require("./controllers/AuthController");

const ValidationsUser = require("./Validations/validationUser");
const ValidationAuth = require("./Validations/validationAuth");

routes.post("/auth", ValidationAuth.login, AuthController.login);

routes.get("/users/:username", authMiddleware, UserController.show);
routes.post("/users", ValidationsUser.withPassword, UserController.store);
routes.put("/users", authMiddleware, ValidationsUser.withoutPassword, UserController.update);
routes.put("/password-update", authMiddleware, ValidationsUser.password, UserController.updatePassword);

routes.put("/avatar", authMiddleware, multer(multerConfig).single("file"), UserController.updateAvatar);

module.exports = routes;