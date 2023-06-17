const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const AuthController = require("../controllers/auth.controller");
const { userService } = require("./dependency");
const mdAuth = require("../middleware/authenticated");

const userController = new UserController(userService);

router.post("/user", (req, res) => userController.register(req, res));
router.post("/user/recover-password", (req, res) => userController.recoverPassword(req, res));
router.get("/user/:id", [mdAuth.validateAuth], (req, res) => userController.getUser(req, res));
router.get("/user", [mdAuth.validateAuth], (req, res) => userController.getUsers(req, res));

module.exports = router;
