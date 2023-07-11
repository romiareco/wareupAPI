const enums = require('../utils/enums');

class ServiceGroupController {

    constructor(serviceGroupService) {
      this.serviceGroupService = serviceGroupService;
    }
    
    async get(req, res, next) {
      const { id } = req.params;

      if (!id || typeof id !== "string") {
        return res.status(400).json({ message: "Invalid Params" });
      }

      const result = await this.serviceGroupService.getServiceGroup(id);
      return res.json(result);
    }  

    async getAll(req, res, next) { 
      const result = await this.serviceGroupService.getServiceGroups();
      return res.json(result);
    }  
}  

module.exports = ServiceGroupController;
  