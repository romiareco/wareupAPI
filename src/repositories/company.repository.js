const enums = require('../utils/enums');
const { CompanyModel, CityModel, DepartmentModel } = require("../database"); 

class CompanyRepository {
  constructor(logRepository) {
    this.log = logRepository;
    this.model = CompanyModel;
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

  async get(id) {
    try {
      return this.model.findOne({
        where: {id: id},
        include: [CityModel]
      });
    }
    catch (error) {
      this.log.create('Error in get: '+error, enums.logsType.database);
    }
  }

  async getByUser(userId) {
    try {
      return await this.model.findAll({
        where: {userId: userId},
        include:[CityModel]
      }); 
    }
    catch (error) {
      this.log.create('Error in getByUser: '+error, enums.logsType.database);
    }

    return null;
  } 
  
  async getByRUT(RUT) {
    try {
      return await this.model.findOne({
        where: {RUT: RUT},
        include: [CityModel]
      }); 
    }
    catch (error) {
      this.log.create('Error in getByRUT: '+error, enums.logsType.database);
    }

    return null;
  }

  async getAll() {
    try {
      return await this.model.findAll({include: [CityModel]}); 
    }
    catch (error) {
      this.log.create('Error in getAll: '+error, enums.logsType.database);
    }

    return null;
  } 
}

module.exports = CompanyRepository;