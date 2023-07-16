const enums = require('../utils/enums');
const { UserModel, UserPasswordChangeModel } = require("../database"); 

class UserRepository {
  constructor(logRepository) {
    this.log = logRepository; 
    this.model = UserModel; 
    this.modelPasswordChange = UserPasswordChangeModel; 
  }

  async create(request) {
    try {
       
      request.status = enums.userStatus.ACTIVE;
      request.role = enums.role.CLIENT;
         
      return this.model.create(request);
    }
    catch (error) {
      this.log.create('Error in create: '+ error, enums.logsType.database);
    }
    return null;
  }

  async update(request) {
    try { 
        return this.model.update(
          {
            lastName: request.lastName,
            name: request.name,
            password: request.password,
            email: request.email
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

  async get(id) {
    try {
      return await this.model.findOne({
        where: {id: id}
      }); 
    }
    catch (error) {
      this.log.create('Error in get: '+error, enums.logsType.database);
    }
  }

  async getByEmail(email) {
    try {
      return await this.model.findOne({
        where: {email: email.toLowerCase()}
      }); 
    }
    catch (error) {
      this.log.create('Error in getByEmail: '+error, enums.logsType.database);
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
  }
 
}

module.exports = UserRepository;