const enums = require('../utils/enums');
const { UserModel } = require("../database");
const config = require('../../config');
const bcrypt = require("bcryptjs")
class UserRepository {
  constructor(logRepository) {
    this.log = logRepository; 
    this.user = UserModel; 
  }

  async create(user) {
    try {
       
        user.status = enums.userStatus.ACTIVE;
        user.role = enums.role.CLIENT;
 
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);
        user.email = user.email.toLowerCase()
         
        return this.user.create(user);
    }
    catch (error) {
      this.log.create('Error in user repository - create: '+ error, enums.logsType.database);
    }
    return null;
  }

  async getUser(id) {
    try {
      return this.user.findOne({
        where: {id: id}
      });
    }
    catch (error) {
      this.log.create('Error in user repository - get: '+error, enums.logsType.database);
    }
  }

  async getUserByEmail(email) {
    try {
      return await this.user.findOne({
        where: {email: email.toLowerCase()}
      }); 
    }
    catch (error) {
      this.log.create('Error in user repository - getUserByEmail: '+error, enums.logsType.database);
    }

    return null;
  }

  async getUsers() {
    try {
      return this.user.findAll({
        where: {status: enums.userStatus.active}
      });
    }
    catch (error) {
      this.log.create('Error in user repository - getUsers: '+error, enums.logsType.database);
    }
  }
}

module.exports = UserRepository;