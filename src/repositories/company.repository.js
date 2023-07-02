const enums = require('../utils/enums');
const { CompanyModel } = require("../database");
const config = require('../../config'); 

class CompanyRepository {
  constructor(logRepository) {
    this.log = logRepository;
    this.company = CompanyModel;
  }
   
  async create(userId, RUT, name, businessName, email, phone, contactName, status) {
    try {
        return this.company.create({
          userId,
          RUT,
          name,
          businessName,
          email,
          phone,
          contactName,
          status
        });
    }
    catch (error) {
      this.log.create('Error in company repository - create: '+error, enums.logsType.database);
    }
    return null;
  }

  async getCompany(id) {
    try {
      return this.company.findOne({
        where: {id: id}
      });
    }
    catch (error) {
      this.log.create('Error in company repository - get: '+error, enums.logsType.database);
    }
  }

  async getCompaniesByUser(userId) {
    try {
      var companies = await this.company.findOne({
        where: {userId: userId}
      });
     return companies;
    }
    catch (error) {
      this.log.create('Error in company repository - getAddressesByUser: '+error, enums.logsType.database);
    }

    return null;
  } 
}

module.exports = CompanyRepository;