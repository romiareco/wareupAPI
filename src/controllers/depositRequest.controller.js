const enums = require('../utils/enums');

class DepositRequestController {

    constructor(depositRequestService) {
      this.service = depositRequestService;
    }
  
    async register(req, res, next) {
  
      const { title, description, email, companyId, phone, address, cityId} = req.body;
   
      if (!title || typeof title !== "string" || (typeof description !== "string") 
        || (!companyId || typeof companyId !== "number")
        || (!email || typeof email !== "string") || (!phone || typeof phone !== "string") || (!address || typeof address !== "string")) {
        return res.status(400).json({ message: "Invalid Params" });
      }
      const result = await this.service.create(req.body);
      return res.status(201).json(result);
    }

    async update(req, res, next) {
  
      const { title, description, email, companyId, phone} = req.body;
   
      if (!title || typeof title !== "string" || (typeof description !== "string") 
        || (!companyId || typeof companyId !== "number")
        || (!email || typeof email !== "string") || (!phone || typeof phone !== "string") ) {
        return res.status(400).json({ message: "Invalid Params" });
      }
      const result = await this.service.update(req.body);
      return res.status(200).json(result);
    }

    async getByCompany(req, res, next) {
      const { companyId } = req.params; 
      if (!companyId || typeof companyId !== "string") {
        return res.status(400).json({ message: "Invalid Params" });
      }
      const result = await this.service.getByCompany(companyId);
      return res.status(200).json(result);
    }

    async get(req, res, next) {
  
      const { id } = req.params;  
      if (!id || typeof id !== "string") {
        return res.status(400).json({ message: "Invalid Params" });
      }

      const result = await this.service.get(id);
      return res.status(200).json(result);
    } 
    
    async getAll(req, res, next) { 
      const result = await this.service.getAll();
      return res.status(200).json(result);
    }  
}  

module.exports = DepositRequestController;
  