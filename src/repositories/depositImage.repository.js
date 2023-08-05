const enums = require('../utils/enums');
const { DepositImageModel } = require("../database");

class DepositImageRepository {
  constructor(logRepository) {
    this.log = logRepository;
    this.model = DepositImageModel; 
  }

  async create(request) {
    try { 
      return this.model.create(request);
    }
    catch (error) {
      this.log.create('Error in create: '+error, enums.logsType.database);
    }
    return null;
  }

  async delete(request) {
    try {
        return this.model.delete(request);
    }
    catch (error) {
      this.log.create('Error in create: '+error, enums.logsType.database);
    }
    return null;
  }

  async get(id) {
    try {
      return this.model.findOne({
        where: {id: id},
      });
    }
    catch (error) {
      this.log.create('Error in get: '+error, enums.logsType.database);
    }
  }

  async getByDeposit(depositId) {
    try {
      return await this.model.findAll({
        where: {depositId: depositId}
      });
    }
    catch (error) {
      this.log.create('Error in getByDeposit: '+error, enums.logsType.database);
    }

    return null;
  }
}

module.exports = DepositImageRepository;