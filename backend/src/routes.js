const { Router } = require("express");

const routes = Router();

const authMiddleware = require("./Middleware/auth");

const UserController =  require("./controllers/UserController");

const ValidationsUser = require("./Validations/ValidationUser");

routes.get("/users/:username", authMiddleware, UserController.show);
routes.post("/users", ValidationsUser.withPassword, UserController.store);
routes.put("/users", authMiddleware, ValidationsUser.withoutPassword, UserController.update);
routes.put("/password-update", authMiddleware, ValidationsUser.password, UserController.updatePassword);

module.exports = routes;