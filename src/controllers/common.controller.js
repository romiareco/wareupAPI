const enums = require('../utils/enums');

class CommonController {

    constructor(commonService) {
      this.service = commonService;
    }  
    
    async getDepartments(req, res, next) { 
      const result = await this.service.getDepartments();
      return res.status(200).json(result);
    } 

    async getCitiesByDepartment(req, res, next) { 

      const { departmentId } = req.params;  
      if (!departmentId || typeof departmentId !== "string") {
        return res.status(400).json({ message: "Invalid Params" });
      }

      const result = await this.service.getCitiesByDepartment(departmentId);
      return res.status(200).json(result);
    } 
    
    
}  

module.exports = CommonController;
  