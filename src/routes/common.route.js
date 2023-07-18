const express = require("express");
const router = express.Router();
const CommonController = require("../controllers/common.controller"); 
const { commonService } = require("./dependency");
const mdAuth = require("../middleware/authenticated");

const controller = new CommonController(commonService);
   
router.get("/common/departments", (req, res) => controller.getDepartments(req, res));   
router.get("/common/cities/:departmentId", (req, res) => controller.getCitiesByDepartment(req, res));  

module.exports = router;
