const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const AuthController = require("../controllers/auth.controller");
const { userService } = require("./dependency");
const mdAuth = require("../middleware/authenticated");

const userController = new UserController(userService);

router.post("/users", (req, res) => userController.register(req, res));
router.post("/users/recover-password", (req, res) => userController.recoverPassword(req, res));
router.get("/users/:id", [mdAuth.validateAuth], (req, res) => userController.getUser(req, res));
router.get("/users/me", [mdAuth.validateAuth], (req, res) => userController.getMe(req, res));
router.get("/users", [mdAuth.validateAuth], (req, res) => userController.getUsers(req, res));

module.exports = router;
