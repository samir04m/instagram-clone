const { Router } = require("express");
const routes = Router();

const authMiddleware = require("../Middleware/auth");
const validationComment = require("../validations/validationComment");
const CommentController = require("../Controllers/CommentController")

routes.use(authMiddleware);

routes.post("/:photo", validationComment.comment, CommentController.store);
routes.put("/:id", validationComment.comment, CommentController.update);
routes.delete("/:id", CommentController.destroy);

module.exports = routes;