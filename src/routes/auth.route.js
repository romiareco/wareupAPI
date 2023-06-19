const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const { userService } = require("./dependency");

const authController = new AuthController(userService);

router.post("/auth/login", (req, res) => authController.login(req, res));
router.post("/auth/refresh_access_token", (req, res) => authController.refreshAccessToken(req, res));

module.exports = router;
