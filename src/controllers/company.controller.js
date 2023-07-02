const enums = require('../utils/enums');

class CompanyController {

    constructor(companyService) {
      this.companyService = companyService;
    }
  
    async register(req, res, next) {
  
      const {userId, RUT, name, businessName, email, phone, contactName } = req.body;
    
      if ((!RUT || typeof RUT !== "string") || (!name || typeof name !== "string") 
        || (!businessName || typeof businessName !== "string") || (!email || typeof email !== "string")
        || (!phone || typeof phone !== "string") || (!contactName || typeof contactName !== "string")
        || (!userId || typeof userId !== "number")) {
        return res.status(400).json({ message: "Invalid Params" });
      }
      const result = await this.companyService.create(userId, RUT, name, businessName, email, phone, contactName, enums.companyStatus.pending);
      return res.status(201).json(result);
    }

    async getByUser(req, res, next) {

      const { userId } = req.params;  
      if (!userId || typeof userId !== "string") {
        return res.status(400).json({ message: "Invalid Params" });
      }

      const result = await this.companyService.getCompaniesByUser(userId);
      return res.json(result);
    }

    async get(req, res, next) {
      const { id } = req.params;

      if (!id || typeof id !== "string") {
        return res.status(400).json({ message: "Invalid Params" });
      }

      const result = await this.companyService.getCompany(id);
      return res.json(result);
    }  
}  

module.exports = CompanyController;
  