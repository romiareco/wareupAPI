const express = require("express");
const router = express.Router();
const DepositController = require("../controllers/deposit.controller"); 
const { depositService } = require("./dependency");
const mdAuth = require("../middleware/authenticated");

const controller = new DepositController(depositService);

router.post("/deposits", /*[mdAuth.validateAuth], */(req, res) => controller.register(req, res));  
router.get("/deposits", /*[mdAuth.validateAuth], */(req, res) => controller.getAll(req, res)); 
router.get("/deposits/:id",/* [mdAuth.validateAuth], */(req, res) => controller.get(req, res)); 
router.get("/deposits/byCompany/:companyId", /*[mdAuth.validateAuth], */(req, res) => controller.getByCompany(req, res)); 

module.exports = router;
