const enums = require('../utils/enums');
const { CompanyModel, CityModel, DepartmentModel } = require("../database");

class CompanyRepository {

  constructor(logRepository){
    this.log = logRepository;
    this.model = CompanyModel;
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
            status: request.status,
            RUT: request.RUT,
            businessName: request.businessName,
            email: request.email,
            phone: request.phone,
            contactName: request.contactName,
            position: request.position, 
            cityId: request.cityId,
            address: request.address,
            postalCode: request.postalCode
          },
          {
            where: { id : request.id}
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
        where: {id: id},
        include: [CityModel]
      });
    }
    catch (error) {
      this.log.create('Error in get: '+error, enums.logsType.database);
    }
    return null;
  }

  async getByUser(userId, status){
    try {

      let condition = { userId: userId };
      if (status) {
        condition = { userId: userId, status: status };
      }

      return await this.model.findAll({
        where: condition,
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

  async getAll(status) {
    try {

      if (status) {
        return await this.model.findAll({where: {status: status, }, include: [CityModel]}); 
      }

      return await this.model.findAll({include: [CityModel]}); 
    }
    catch (error) {
      this.log.create('Error in getAll: '+error, enums.logsType.database);
    }

    return null;
  }
}

module.exports = CompanyRepository;