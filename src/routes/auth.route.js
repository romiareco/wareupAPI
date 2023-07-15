const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const { authService } = require("./dependency");
  
const controller = new AuthController(authService);

router.post("/auth/login", (req, res) => controller.login(req, res));
router.post("/auth/refresh_access_token", (req, res) => controller.refreshAccessToken(req, res));

module.exports = router;
