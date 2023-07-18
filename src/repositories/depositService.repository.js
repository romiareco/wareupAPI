const enums = require('../utils/enums');
const { DepositServiceModel, ServiceModel } = require("../database");  

class DepositServiceRepository {
  constructor(logRepository) {
    this.log = logRepository;
    this.model = DepositServiceModel; 
  }
   
  async create(request) {
    try { 
      return this.model.findOrCreate({where: { serviceId: request.serviceId, depositId: request.depositId },
         defaults: request }); 
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
        include: [ServiceModel]
      });
    }
    catch (error) {
      this.log.create('Error in get: '+error, enums.logsType.database);
    }
  }

  async getByDeposit(depositId) {
    try {
      return await this.model.findAll({
        where: {depositId: depositId},
        include: [ServiceModel]
      }); 
    }
    catch (error) {
      this.log.create('Error in getByDeposit: '+error, enums.logsType.database);
    }

    return null;
  } 
}

module.exports = DepositServiceRepository;