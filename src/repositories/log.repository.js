const { LogModel } = require("../database");
const config = require('../../config');

class LogRepository {
  constructor() {
    this.log = LogModel;
    this.log.sync({ force: config.db.recreate,  alter: config.db.alter });
  }

  async create(description, type) {
    try {
        if(config.mode == 'dev'){
          console.log(description);
        }
        return this.log.create({
          description,
          type
        });
    }
    catch (error) {
      console.log(error);
    }
    return null;
  }  
}

module.exports = LogRepository;