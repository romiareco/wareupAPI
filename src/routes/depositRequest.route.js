const express = require("express");
const router = express.Router();
const DepositRequestController = require("../controllers/depositRequest.controller"); 
const { depositRequestService } = require("./dependency");
const mdAuth = require("../middleware/authenticated");

const controller = new DepositRequestController(depositRequestService);

router.post("/depositRequests", /*[mdAuth.validateAuth], */(req, res) => controller.register(req, res));
router.put("/depositRequests", /*[mdAuth.validateAuth], */(req, res) => controller.update(req, res));
router.get("/depositRequests", /*[mdAuth.validateAuth], */(req, res) => controller.getAll(req, res));
router.get("/depositRequests/:id",/* [mdAuth.validateAuth], */(req, res) => controller.get(req, res));
router.get("/depositRequests/byCompany/:companyId", /*[mdAuth.validateAuth], */(req, res) => controller.getByCompany(req, res));
router.get("/depositRequests/byUser/:userId", /*[mdAuth.validateAuth], */(req, res) => controller.getByUser(req, res));

module.exports = router;
