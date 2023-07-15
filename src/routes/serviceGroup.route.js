const express = require("express");
const router = express.Router();
const ServiceGroupController = require("../controllers/serviceGroup.controller"); 
const { serviceGroupService } = require("./dependency");
const mdAuth = require("../middleware/authenticated");

const controller = new ServiceGroupController(serviceGroupService);
 
router.get("/serviceGroups", /*[mdAuth.validateAuth], */(req, res) => controller.getAll(req, res)); 
router.get("/serviceGroups/:id",/* [mdAuth.validateAuth], */(req, res) => controller.get(req, res));  

module.exports = router;
