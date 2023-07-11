const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const { authService } = require("./dependency");
  
const authController = new AuthController(authService);

router.post("/auth/login", (req, res) => authController.login(req, res));
router.post("/auth/refresh_access_token", (req, res) => authController.refreshAccessToken(req, res));

module.exports = router;
