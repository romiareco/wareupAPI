const Sequelize = require("sequelize");
const Model = Sequelize.Model;
class DepositServiceModel extends Model {
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
        serviceId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'services',
            key: 'id'
          }
        }, 
      },
      {
        sequelize,
        modelName: "depositService"
      }
    );
  }
}

module.exports = DepositServiceModel;
