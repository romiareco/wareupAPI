const enums = require('../utils/enums');
const { UserModel } = require("../database");
const config = require('../../config');

class UserRepository {
  constructor(logRepository) {
    this.log = logRepository;

    this.user = UserModel;
    //this.user.sync({ force: config.db.recreate,  alter: config.db.alter });
  }

  async create(name, last_name, password, email) {
    try {
        const status = enums.userStatus.active;
        const role = enums.role.client;

        return this.user.create({
          name,
          last_name,
          password,
          email,
          status,
          role
        });
    }
    catch (error) {
      this.log.create('Error in user repository - create: '+error, enums.logsType.database);
    }
    return null;
  }

  async getUser(id) {
    try {
      return this.user.findOne({ id });
    }
    catch (error) {
      this.log.create('Error in user repository - get: '+error, enums.logsType.database);
    }
  }

  async getUserByEmail(email) {
    try {
      var user = await this.user.findOne({
        where: {email: email}
      });
     return user;
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