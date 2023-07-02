const express = require("express");
const router = express.Router();
const AddressController = require("../controllers/address.controller"); 
const { addressService } = require("./dependency");
const mdAuth = require("../middleware/authenticated");

const addressController = new AddressController(addressService);

router.post("/addresses", /*[mdAuth.validateAuth], */(req, res) => addressController.register(req, res));  
router.get("/addresses/:id",/* [mdAuth.validateAuth], */(req, res) => addressController.get(req, res)); 
router.get("/addresses/byCompany/:companyId", /*[mdAuth.validateAuth], */(req, res) => addressController.getByCompany(req, res)); 

module.exports = router;
