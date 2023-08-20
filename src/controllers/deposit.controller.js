const enums = require('../utils/enums');

class DepositController {

    constructor(depositService) {
      this.service = depositService;
    }

    async register(req, res, next) {
      const { description, cityId, totalM3} = req.body;

      if (!description || typeof description !== "string" || !cityId || typeof cityId !== "number"
        || !totalM3 || typeof totalM3 !== "number") {
        return res.status(400).json({ message: "Invalid Params" });
      }
      const result = await this.service.create(req.body);
      return res.status(200).json(result);
    } 

    async update(req, res, next) {
      const { status, description, cityId, id, totalM3 } = req.body;
  
      if (!id 
        || !status || typeof status !== "number" 
        || !description || typeof description !== "string" || !cityId || typeof cityId !== "number"
        || !totalM3 || typeof totalM3 !== "number") {
        return res.status(400).json({ message: "Invalid Params" });
      }
 
      const result = await this.service.update(req.body);
      return res.status(200).json(result);
    }

    async delete(req, res, next) {
      const { id } = req.body;
  
      if (!id) {
        return res.status(400).json({ message: "Invalid Params" });
      }   
 
      const result = await this.service.delete(req.body);
      return res.status(200).json(result);
    }
    
    /*async registerServices(req, res, next) {

      const { depositId, servicesId } = req.body;

      if (!depositId || typeof depositId !== "string") {
        return res.status(400).json({ message: "Invalid Params" });
      }
      const result = await this.service.addDepositServices(depositId, servicesId);
      return res.status(200).json(result);
    }  */

    async registerImages(req, res, next) {

      const { depositId, images } = req.body;

      if (!depositId || typeof depositId !== "string") {
        return res.status(400).json({ message: "Invalid Params" });
      }
      const result = await this.service.addDepositImages(depositId, images);
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
    
    async getServicesByDeposit(req, res, next) {
      const { depositId } = req.params; 
      if (!depositId || typeof depositId !== "string") {
        return res.status(400).json({ message: "Invalid Params" });
      }
      const result = await this.service.getServicesByDeposit(depositId);
      return res.status(200).json(result);
    }
    
    async getImagesByDeposit(req, res, next) {
      const { depositId } = req.params; 
      if (!depositId || typeof depositId !== "string") {
        return res.status(400).json({ message: "Invalid Params" });
      }
      const result = await this.service.getImagesByDeposit(depositId);
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

    async getByFilter(req, res, next) { 
      const result = await this.service.getByFilter(req.body);
      return res.status(200).json(result);
    }  
}  

module.exports = DepositController;
  