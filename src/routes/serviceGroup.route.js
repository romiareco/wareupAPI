const express = require("express");
const router = express.Router();
const ServiceGroupController = require("../controllers/serviceGroup.controller"); 
const { serviceGroupService } = require("./dependency");
const mdAuth = require("../middleware/authenticated");

const serviceGroupController = new ServiceGroupController(serviceGroupService);
 
router.get("/serviceGroups", /*[mdAuth.validateAuth], */(req, res) => serviceGroupController.getAll(req, res)); 
router.get("/serviceGroups/:id",/* [mdAuth.validateAuth], */(req, res) => serviceGroupController.get(req, res));  

module.exports = router;
