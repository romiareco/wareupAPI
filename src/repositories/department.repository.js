const enums = require('../utils/enums');
const {  DepartmentModel, CityModel } = require("../database"); 

class DepartmentRepository {
  constructor(logRepository) {
    this.log = logRepository;
    this.model = DepartmentModel; 
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

  async getAll() {
    try {
      return await this.model.findAll({include:[CityModel]}); 
    }
    catch (error) {
      this.log.create('Error in getAll: '+error, enums.logsType.database);
    }

    return null;
  }  

}

module.exports = DepartmentRepository;