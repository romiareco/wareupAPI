const enums = require('../utils/enums');
const { DepositModel } = require("../database");
const config = require('../../config'); 

class DepositRepository {
  constructor(logRepository) {
    this.log = logRepository;
    this.deposit = DepositModel;
  }
   
  async create(title, description, totalM3, comment, minimumBusinessPeriod, minimumBusinessVolume, expectedPrice, status, companyId, addressId) {
    try {
        return this.deposit.create({
          title, description, totalM3, comment, minimumBusinessPeriod, minimumBusinessVolume, expectedPrice, status, companyId, addressId
        });
    }
    catch (error) {
      this.log.create('Error in deposit repository - create: '+error, enums.logsType.database);
    }
    return null;
  }

  async getDeposit(id) {
    try {
      return this.deposit.findOne({
        where: {id: id}
      });
    }
    catch (error) {
      this.log.create('Error in deposit repository - getDeposit: '+error, enums.logsType.database);
    }
  }

  async getDepositsByCompany(companyId) {
    try {
      var deposits = await this.deposit.findOne({
        where: {companyId: companyId}
      });
     return deposits;
    }
    catch (error) {
      this.log.create('Error in deposit repository - getDepositsByCompany: '+error, enums.logsType.database);
    }

    return null;
  } 
}

module.exports = DepositRepository;