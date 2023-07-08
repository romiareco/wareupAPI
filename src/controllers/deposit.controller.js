const enums = require('../utils/enums');

class DepositController {

    constructor(depositService) {
      this.depositService = depositService;
    }
  
    async register(req, res, next) {
  
      const { title, description, totalM3, comment, minimumBusinessPeriod, minimumBusinessVolume, expectedPrice, companyId, addressId} = req.body;
  
      //validate type enum
       
      if (!title || typeof title !== "string" || (typeof description !== "string") 
        || (typeof totalM3 !== "string") || (!companyId || typeof companyId !== "number")
        || (typeof addressId !== "number") || (typeof minimumBusinessVolume !== "decimal")
        || (typeof expectedPrice !== "decimal")
        || (typeof minimumBusinessPeriod !== "number")) {
        return res.status(400).json({ message: "Invalid Params" });
      }
      const result = await this.depositService.create(title, description, totalM3, comment, minimumBusinessPeriod, minimumBusinessVolume, expectedPrice, companyId, addressId);
      return res.status(201).json(result);
    }

    async getByCompany(req, res, next) {
      const { companyId } = req.params; 
      if (!companyId || typeof companyId !== "string") {
        return res.status(400).json({ message: "Invalid Params" });
      }
      const result = await this.depositService.getDepositsByCompany(companyId);
      return res.json(result);
    }

    async get(req, res, next) {
  
      const { id } = req.params;  
      if (!id || typeof id !== "string") {
        return res.status(400).json({ message: "Invalid Params" });
      }

      const result = await this.depositService.getDeposit(id);
      return res.json(result);
    } 
    
    async getAll(req, res, next) { 
      const result = await this.depositService.getDeposits();
      return res.json(result);
    }  
}  

module.exports = DepositController;
  