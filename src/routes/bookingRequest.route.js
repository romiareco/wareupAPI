const express = require("express");
const router = express.Router();
const BookingRequestController = require("../controllers/bookingRequest.controller"); 
const { bookingRequestService } = require("./dependency");
const mdAuth = require("../middleware/authenticated");

const controller = new BookingRequestController(bookingRequestService);

router.post("/bookingRequests", [mdAuth.validateAuth], (req, res) => controller.register(req, res));
router.put("/bookingRequests/:id", [mdAuth.validateAuth],(req, res) => controller.update(req, res));
router.get("/bookingRequests", [mdAuth.validateAuth],(req, res) => controller.getAll(req, res));
router.get("/bookingRequests/:id", [mdAuth.validateAuth], (req, res) => controller.get(req, res));
router.get("/bookingRequests/byDeposit/:depositId", [mdAuth.validateAuth], (req, res) => controller.getByDeposit(req, res));
router.get("/bookingRequests/byUser/:userId", [mdAuth.validateAuth], (req, res) => controller.getByUser(req, res));

module.exports = router;
