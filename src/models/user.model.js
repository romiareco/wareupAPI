const Sequelize = require("sequelize");
const Model = Sequelize.Model;
class UserModel extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: true
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,  
          unique: 'userEmailIndex'
        },
        role: {
          type: DataTypes.STRING,
          allowNull: false        
        },
        status: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        industry: {
          type: DataTypes.STRING,
          allowNull: true
        },
      },
      {
        sequelize,
        modelName: "user"
      }
    );
  }
}

module.exports = UserModel;
