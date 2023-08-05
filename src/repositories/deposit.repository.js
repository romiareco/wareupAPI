const enums = require('../utils/enums');
const { DepositModel } = require("../database"); 
const DepositServiceModel = require('../models/depositService.model');

class DepositRepository {
  constructor(logRepository){
    this.log = logRepository;
    this.model = DepositModel;
  }

  async create(request){
    try { 
        return this.model.create(request);
    }
    catch (error) {
      this.log.create('Error in create: '+error, enums.logsType.database);
    }
    return null;
  }

  async get(id){
    try {
      return this.model.findOne({
        where: {id: id}
      });
    }
    catch (error) {
      this.log.create('Error in get: '+error, enums.logsType.database);
    }
    return null;
  }

  async getByCompany(companyId) {
    try {
      return await this.model.findAll({
        where: {companyId: companyId}
      });
    }
    catch (error) {
      this.log.create('Error in getByCompany: '+error, enums.logsType.database);
    }

    return null;
  }

  async getByFilter(filterOptions) {
    try {
      return await this.model.findAll({
        where:  { title: { $like: '%'+filterOptions.title+'%' } }
      });
    }
    catch (error) {
      this.log.create('Error in getByCompany: '+error, enums.logsType.database);
    }

    return null;
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

module.exports = DepositRepository;