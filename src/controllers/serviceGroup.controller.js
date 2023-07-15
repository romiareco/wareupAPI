const enums = require('../utils/enums');

class ServiceGroupController {

    constructor(serviceGroupService) {
      this.service = serviceGroupService;
    }
    
    async get(req, res, next) {
      const { id } = req.params;

      if (!id || typeof id !== "string") {
        return res.status(400).json({ message: "Invalid Params" });
      }

      const result = await this.service.getServiceGroup(id);
      return res.json(result);
    }  

    async getAll(req, res, next) { 
      const result = await this.service.getServiceGroups();
      return res.json(result);
    }  
}  

module.exports = ServiceGroupController;
  