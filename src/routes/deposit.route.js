var express = require("express");
var router = express.Router();
var DepositController = require("../controllers/deposit.controller");
var { depositService } = require("./dependency");
var mdAuth = require("../middleware/authenticated");

var controller = new DepositController(depositService);

router.post("/deposits", /*[mdAuth.validateAuth], */(req, res) => controller.register(req, res)); 
router.put("/deposits",/*[mdAuth.validateAuth], */ (req, res) => controller.update(req, res));
router.post("/deposits/images", /*[mdAuth.validateAuth], */(req, res) => controller.registerImages(req, res));
router.get("/deposits", /*[mdAuth.validateAuth], */(req, res) => controller.getAll(req, res));
router.get("/deposits/:id",/* [mdAuth.validateAuth], */(req, res) => controller.get(req, res));
router.get("/deposits/byCompany/:companyId", /*[mdAuth.validateAuth], */(req, res) => controller.getByCompany(req, res));
router.get("/deposits/byUser/:userId", /*[mdAuth.validateAuth], */(req, res) => controller.getByUser(req, res));
router.get("/deposits/services/:depositId", /*[mdAuth.validateAuth], */(req, res) => controller.getServicesByDeposit(req, res));
router.get("/deposits/images/:depositId", /*[mdAuth.validateAuth], */(req, res) => controller.getImagesByDeposit(req, res));
router.get("/deposits/byFilter", /*[mdAuth.validateAuth], */(req, res) => controller.getByFilter(req, res));

module.exports = router;
