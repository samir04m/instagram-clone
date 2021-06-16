const { Router } = require("express");
const routes = Router();

const authMiddleware = require("../Middleware/auth");
const validationComment = require("../validations/validationComment");
const CommentController = require("../Controllers/CommentController")

routes.post("/:photo", validationComment.comment, authMiddleware, CommentController.store);
routes.put("/:id", validationComment.comment, authMiddleware, CommentController.update);
routes.delete("/:id", authMiddleware, CommentController.destroy);

module.exports = routes;