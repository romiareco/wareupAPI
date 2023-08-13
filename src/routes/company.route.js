const express = require("express");
const router = express.Router();
const CompanyController = require("../controllers/company.controller"); 
const { companyService } = require("./dependency");
const mdAuth = require("../middleware/authenticated");

const controller = new CompanyController(companyService);

router.post("/companies", /*[mdAuth.validateAuth], */ (req, res) => controller.register(req, res)); 
router.put("/companies",/*[mdAuth.validateAuth], */ (req, res) => controller.update(req, res));
router.delete("/companies",/*[mdAuth.validateAuth], */ (req, res) => controller.delete(req, res));
router.get("/companies",/*[mdAuth.validateAuth], */  (req, res) => controller.getAll(req, res)); 
router.get("/companies/:id", [mdAuth.validateAuth],  (req, res) => controller.get(req, res));
router.get("/companies/byUser/:userId", [mdAuth.validateAuth], (req, res) => controller.getByUser(req, res));

module.exports = router;
