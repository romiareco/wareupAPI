const enums = require('../utils/enums');
const { AddressModel } = require("../database");
const config = require('../../config'); 

class AddressRepository {
  constructor(logRepository) {
    this.log = logRepository;
    this.address = AddressModel;
  }
   
  async create(city, street, postalCode, phone, type, companyId) {
    try {
        return this.address.create({
          city,
          street,
          postalCode,
          phone,
          type,
          companyId
        });
    }
    catch (error) {
      this.log.create('Error in address repository - create: '+error, enums.logsType.database);
    }
    return null;
  }

  async getAddress(id) {
    try {
      return this.address.findOne({
        where: {id: id}
      });
    }
    catch (error) {
      this.log.create('Error in address repository - get: '+error, enums.logsType.database);
    }
  }

  async getAddressesByCompany(companyId) {
    try {
      var addresses = await this.address.findOne({
        where: {companyId: companyId}
      });
     return addresses;
    }
    catch (error) {
      this.log.create('Error in address repository - getAddressesByCompany: '+error, enums.logsType.database);
    }

    return null;
  } 
}

module.exports = AddressRepository;