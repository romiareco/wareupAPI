const express = require("express");
const router = express.Router();
const CompanyController = require("../controllers/company.controller");
const AuthController = require("../controllers/auth.controller");
const { companyService } = require("./dependency");
const mdAuth = require("../middleware/authenticated");

const companyController = new CompanyController(companyService);

router.post("/companies", (req, res) => companyController.register(req, res)); 
router.get("/companies/:id",/* [mdAuth.validateAuth],  */(req, res) => companyController.get(req, res));
router.get("/companies/byUser/:id", /*[mdAuth.validateAuth], */(req, res) => companyController.getByUser(req, res));

module.exports = router;
