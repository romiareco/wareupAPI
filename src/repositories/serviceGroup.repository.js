const enums = require('../utils/enums');
const { ServiceGroupModel, ServiceModel } = require("../database");
const config = require('../../config'); 

class ServiceGroupRepository {
  constructor(logRepository) {
    this.log = logRepository;
    this.serviceGroup = ServiceGroupModel;
  }
    
  async getServiceGroup(id) {
    try {
      return this.serviceGroup.findOne({
        where: {id: id},
        include: [{
          model: ServiceModel
        }]
      });
    }
    catch (error) {
      this.log.create('Error in serviceGroup repository - get: '+error, enums.logsType.database);
    }
  }

  async getServiceGroups() {
    try {
      return await this.serviceGroup.findAll({
        include: [{
          model: ServiceModel
        }]
      }); 
    }
    catch (error) {
      this.log.create('Error in serviceGroup repository - getServiceGroups: '+error, enums.logsType.database);
    }

    return null;
  } 
}

module.exports = ServiceGroupRepository;