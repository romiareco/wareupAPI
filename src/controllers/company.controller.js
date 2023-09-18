const enums = require('../utils/enums');

class CompanyController {

    constructor(companyService, depositService) {
      this.service = companyService;
      this.depositService = depositService;
    }
  
    async register(req, res, next) {
  
      const {userId, RUT, businessName, email, phone, contactName } = req.body;
    
      if ((!RUT || typeof RUT !== "string") 
        || (!businessName || typeof businessName !== "string") 
        || (!email || typeof email !== "string")
        || (!phone || typeof phone !== "string") 
        || (!contactName || typeof contactName !== "string")
        || (!userId || typeof userId !== "number")) {
        return res.status(400).json({ message: "Invalid Params"});
      }
      const result = await this.service.create(req.body);

      return res.status(200).json(result);
    }

    async update(req, res, next) {
      const { status, email, phone, businessName, contactName, RUT } = req.body;
      const { id } = req.params;

      if (!id 
         || (!status || typeof status !== "number")
         || (!email || typeof email !== "string") 
         || (!phone || typeof phone !== "string")
         || (!businessName || typeof businessName !== "string")
         || (!contactName || typeof contactName !== "string") 
         || (!RUT || typeof RUT !== "string") ) {
        return res.status(400).json({ message: "Invalid Params" });
      }   
      let company = req.body;
      company.id = id;
      const result = await this.service.update(company);
      return res.status(200).json(result);
    }

    async delete(req, res, next) {
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).json({ message: "Invalid Params" });
      }   
 
      await this.depositService.deleteByCompany(id);
      const result = await this.service.delete(id);
      return res.status(200).json(result);
    }

    async getByUser(req, res, next) {

      const { userId } = req.params;   
      if (!userId || typeof userId !== "string") {
        return res.status(400).json({ message: "Invalid Params" });
      }

      const status = null;
      if(req.query){
        status = req.query.status;
      }

      const result = await this.service.getByUser(userId,status);
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
      const result = await this.service.getAll(req.query.status);
      return res.status(200).json(result);
    }  
}  

module.exports = CompanyController;
  