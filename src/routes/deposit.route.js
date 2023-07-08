const express = require("express");
const router = express.Router();
const DepositController = require("../controllers/deposit.controller"); 
const { depositService } = require("./dependency");
const mdAuth = require("../middleware/authenticated");

const depositController = new DepositController(depositService);

router.post("/deposits", /*[mdAuth.validateAuth], */(req, res) => depositController.register(req, res));  
router.get("/deposits", /*[mdAuth.validateAuth], */(req, res) => depositController.getAll(req, res)); 
router.get("/deposits/:id",/* [mdAuth.validateAuth], */(req, res) => depositController.get(req, res)); 
router.get("/deposits/byCompany/:companyId", /*[mdAuth.validateAuth], */(req, res) => depositController.getByCompany(req, res)); 

module.exports = router;
