const Sequelize = require("sequelize");
require("dotenv").config();

const config = require('../../config');
const UserModel = require("../models/user.model");
const LogModel= require("../models/log.model"); 

const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    {
      host:  config.db.host,
      dialect: "mysql"
    }
  );

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

sequelize.sync({ force: config.db.recreate,  alter: config.db.alter });

const models = {
  UserModel: UserModel.init(sequelize, Sequelize),
  LogModel: LogModel.init(sequelize, Sequelize)
};

const db = {
  ...models,
  sequelize
};

module.exports = db;
