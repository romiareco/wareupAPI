const enums = require('../utils/enums');

class CompanyController {

    constructor(companyService) {
      this.service = companyService;
    }
  
    async register(req, res, next) {
  
      const {userId, RUT, name, businessName, email, phone, contactName } = req.body;
    
      if ((!RUT || typeof RUT !== "string") || (!name || typeof name !== "string") 
        || (!businessName || typeof businessName !== "string") || (!email || typeof email !== "string")
        || (!phone || typeof phone !== "string") || (!contactName || typeof contactName !== "string")
        || (!userId || typeof userId !== "number")) {
        return res.status(400).json({ message: "Invalid Params" });
      }
      const result = await this.service.create(req.body);

      return res.status(201).json(result);
    }

    async getByUser(req, res, next) {

      const { userId } = req.params;  
      if (!userId || typeof userId !== "string") {
        return res.status(400).json({ message: "Invalid Params" });
      }

      const result = await this.service.getByUser(userId);
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

module.exports = CompanyController;
  