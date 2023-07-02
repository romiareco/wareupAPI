const Sequelize = require("sequelize");
const Model = Sequelize.Model;
class DepositImageModel extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      { 
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        depositId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'deposits',
            key: 'id'
          }
        },
        image: {
          type: DataTypes.STRING,
          allowNull: false
        },
        order: {
          type: DataTypes.INTEGER,
          allowNull: false
        } 
      },
      {
        sequelize,
        modelName: "depositImage"
      }
    );
  }
}

module.exports = DepositImageModel;
