const enums = require('../utils/enums');
const { DepositRequestModel } = require("../database"); 

class DepositRequestRepository {
  constructor(logRepository) {
    this.log = logRepository;
    this.model = DepositRequestModel;
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

  async update(request) {
    try { 
        return this.model.update(request, { where: { id: request.id } });
    }
    catch (error) {
      this.log.create('Error in update: '+error, enums.logsType.database);
    }
    return null;
  } 

  async get(id) {
    try {
      return this.model.findOne({
        where: {id: id}
      });
    }
    catch (error) {
      this.log.create('Error in get: '+error, enums.logsType.database);
    }
  }

  async getByCompany(companyId) {
    try {
      return this.model.findOne({
        where: {companyId: companyId}
      });
    }
    catch (error) {
      this.log.create('Error in getByCompany: '+error, enums.logsType.database);
    }
  }
 
  async getAll() {
    try {
      return await this.model.findAll(); 
    }
    catch (error) {
      this.log.create('Error in getAll: '+error, enums.logsType.database);
    }

    return null;
  } 
}

module.exports = DepositRequestRepository;