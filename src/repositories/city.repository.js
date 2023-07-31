const enums = require('../utils/enums');
const {  CityModel } = require("../database"); 

class CityRepository {
  constructor(logRepository) {
    this.log = logRepository;
    this.model = CityModel; 
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
  
  async getByDepartment(departmentId) {
    try {
      return await this.model.findAll({
        where: {departmentId: departmentId}
      }); 
    }
    catch (error) {
      this.log.create('Error in getByDepartment: '+error, enums.logsType.database);
    }

    return null;
  }

}

module.exports = CityRepository;