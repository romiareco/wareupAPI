const Sequelize = require("sequelize");
const Model = Sequelize.Model;
class UserPasswordChangeModel extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },  
        email: {
          type: DataTypes.STRING,
          allowNull: false,  
          unique: 'userEmailIndex'
        },   
        data: {
          type: DataTypes.STRING,
          allowNull: false,  
          unique: 'userEmailIndex'
        }, 
        status: {
          type: DataTypes.INTEGER,
          allowNull: false
        } 
      },
      {
        sequelize,
        modelName: "userPasswordChange"
      }
    );
  }
}

module.exports = UserPasswordChangeModel;
