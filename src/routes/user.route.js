const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const AuthController = require("../controllers/auth.controller");
const { userService } = require("./dependency");

const userController = new UserController(userService);
const authController = new AuthController(userService);

router.post("/login", (req, res) => authController.login(req, res));
router.post("/user", (req, res) => userController.register(req, res));
router.post("/user/recover-password", (req, res) => userController.recoverPassword(req, res));
router.get("/user/:id", (req, res) => userController.getUser(req, res));
router.get("/user", (req, res) => userController.getUsers(req, res));

module.exports = router;
