const enums = require('../utils/enums');
const { DepositCalendarModel } = require("../database"); 

class DepositCalendarRepository {
  constructor(logRepository){
    this.log = logRepository;
    this.model = DepositCalendarModel;
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

  async update(request) {
    try { 
        return this.model.update(
          { 
            dateFrom: request.dateFrom,
            dateTo: request.dateTo,
            totalM3: request.totalM3,
            isDeleted: request.isDeleted
          },
          {
            where: { id : request.id }
          });
    }
    catch (error) {
      this.log.create('Error in update: '+ error, enums.logsType.database);
    }
    return null;
  }

  async get(id){
    try {
      return this.model.findOne({
        where: { id: id }
      });
    }
    catch (error) {
      this.log.create('Error in get: '+error, enums.logsType.database);
    }
    return null;
  }

  async getByDeposit(depositId) {
    try {
      return await this.model.findAll({
        where: { depositId: depositId, isDeleted:false }
      });
    }
    catch (error) {
      this.log.create('Error in getByDeposit: '+error, enums.logsType.database);
    }

    return null;
  } 

  async getAll() {
    try {
      return await this.model.findAll({
        where: { isDeleted:false }
      });
    }
    catch (error) {
      this.log.create('Error in getAll: '+error, enums.logsType.database);
    }

    return null;
  } 
}

module.exports = DepositCalendarRepository;