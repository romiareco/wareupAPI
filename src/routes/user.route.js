const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const AuthController = require("../controllers/auth.controller");
const { userService } = require("./dependency");
const mdAuth = require("../middleware/authenticated");

const controller = new UserController(userService);

router.post("/users", (req, res) => controller.register(req, res));
router.put("/users", (req, res) => controller.update(req, res));
router.delete("/users",/*[mdAuth.validateAuth], */ (req, res) => controller.delete(req, res));
router.post("/users/recover-password", (req, res) => controller.recoverPassword(req, res));
router.put("/users/update-password", (req, res) => controller.updatePassword(req, res));
router.post("/users/contact", (req, res) => controller.contact(req, res));
router.get("/users/me", [mdAuth.validateAuth], (req, res) => controller.getMe(req, res));
router.get("/users/:id", [mdAuth.validateAuth], (req, res) => controller.get(req, res));
router.get("/users", /*[mdAuth.validateAuth], */ (req, res) => controller.getAll(req, res));

module.exports = router;
