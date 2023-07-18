const enums = require('../utils/enums');

class DepositController {

    constructor(depositService) {
      this.service = depositService;
    }
  
    async register(req, res, next) {
  
      const { title, description} = req.body;
   
      if (!title || typeof title !== "string" || !description || typeof description !== "string") {
        return res.status(400).json({ message: "Invalid Params" });
      }
      const result = await this.service.create(req.body);
      return res.status(201).json(result);
    } 

    async registerServices(req, res, next) {
  
      const { depositId, servicesId } = req.body;
    
      if (!depositId || typeof depositId !== "string") {
        return res.status(400).json({ message: "Invalid Params" });
      }
      const result = await this.service.addDepositServices(depositId, servicesId);
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

    
    async getServicesByDeposit(req, res, next) {
      const { depositId } = req.params; 
      if (!depositId || typeof depositId !== "string") {
        return res.status(400).json({ message: "Invalid Params" });
      }
      const result = await this.service.getServicesByDeposit(depositId);
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

module.exports = DepositController;
  