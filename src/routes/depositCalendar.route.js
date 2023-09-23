const express = require("express");
const router = express.Router();
const DepositCalendarController = require("../controllers/depositCalendar.controller"); 
const { depositCalendarService } = require("./dependency");
const mdAuth = require("../middleware/authenticated");

const controller = new DepositCalendarController(depositCalendarService);

router.post("/depositCalendar", [mdAuth.validateAuth], (req, res) => controller.register(req, res));
router.put("/depositCalendar/:id", [mdAuth.validateAuth], (req, res) => controller.update(req, res));
router.get("/depositCalendar/:id", [mdAuth.validateAuth], (req, res) => controller.get(req, res));
router.get("/depositCalendar/byDeposit/:depositId", /*[mdAuth.validateAuth], */(req, res) => controller.getByDeposit(req, res));

module.exports = router;
