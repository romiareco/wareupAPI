const enums = require('../utils/enums');

class AddressController {

    constructor(addressService) {
      this.addressService = addressService;
    }
  
    async register(req, res, next) {
  
      const { city, street, postalCode, phone, type, companyId } = req.body;
  
      //validate type enum
       
      if (!city || typeof city !== "string" || (!street || typeof street !== "string") 
        || (!postalCode || typeof postalCode !== "string") || (!phone || typeof phone !== "string")) {
        return res.status(400).json({ message: "Invalid Params" });
      }
      const result = await this.addressService.create(city, street, postalCode, phone, type, companyId);
      return res.status(201).json(result);
    }

    async getByCompany(req, res, next) {
      const { companyId } = req.params; 
      if (!companyId || typeof companyId !== "string") {
        return res.status(400).json({ message: "Invalid Params" });
      }
      const result = await this.addressService.getAddressesByCompany(companyId);
      return res.json(result);
    }

    async get(req, res, next) {
  
      const { id } = req.params;  
      if (!id || typeof id !== "string") {
        return res.status(400).json({ message: "Invalid Params" });
      }

      const result = await this.addressService.getAddress(id);
      return res.json(result);
    }  
}  

module.exports = AddressController;
  