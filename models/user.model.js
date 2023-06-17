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
        last_name: {
          type: DataTypes.STRING,
          allowNull: false
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
        status: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        created_date: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW
        },
        update_date: {
          type: DataTypes.DATE,
          allowNull: true
        }
      },
      {
        sequelize,
        modelName: "user"
      }
    );
  }
}

module.exports = UserModel;
