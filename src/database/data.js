const Sequelize = require("sequelize");
require("dotenv").config();

const config = require('../../config');
const UserModel = require("../models/user.model");
const LogModel = require("../models/log.model"); 
const DepositModel = require("../models/deposit.model"); 
const DepositImageModel = require("../models/depositImage.model"); 
const CompanyModel = require("../models/company.model"); 
const AddressModel = require("../models/address.model"); 

const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    {
      host:  config.db.host,
      dialect: "mysql",
      logging: true
    },    
  );

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

sequelize.sync({ force: config.db.recreate,  alter: config.db.alter });

const models = {
  UserModel: UserModel.init(sequelize, Sequelize),
  LogModel: LogModel.init(sequelize, Sequelize),
  AddressModel: AddressModel.init(sequelize, Sequelize),
  CompanyModel: CompanyModel.init(sequelize, Sequelize),
  DepositModel: DepositModel.init(sequelize, Sequelize),
  DepositImageModel: DepositImageModel.init(sequelize, Sequelize)
};

const db = {
  ...models,
  sequelize
};

module.exports = db;
