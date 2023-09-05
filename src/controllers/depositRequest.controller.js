const enums = require('../utils/enums');

class DepositRequestController {

    constructor(depositRequestService) {
      this.service = depositRequestService;
    }
  
    async register(req, res, next) {
  
      const { title, description, email, companyId, phone, address, userId} = req.body;
   
      if (!title || typeof title !== "string" || (typeof description !== "string")
        || (!companyId || typeof companyId !== "number")
        || (!email || typeof email !== "string") || (!phone || typeof phone !== "string") 
        || (!address || typeof address !== "string")) {
        return res.status(400).json({ message: "Invalid Params" });
      }
      const result = await this.service.create(req.body);
      return res.status(200).json(result);
    }

    async update(req, res, next) {
  
      const { status } = req.body;
      const { id } = req.params;

      if (!status || typeof status !== "number" ) {
        return res.status(400).json({ message: "Invalid Params" });
      }

      const depositRequest = req.body;
      depositRequest.id = id;

      const result = await this.service.update(depositRequest);
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

module.exports = DepositRequestController;
  