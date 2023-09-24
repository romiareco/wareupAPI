const Sequelize = require("sequelize");
const Model = Sequelize.Model;
class DepositModel extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      { 
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true
        },
        totalM3: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        currency: {
          type: DataTypes.STRING,
          allowNull: true
        },
        minimumBusinessPeriod: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        minimumBusinessVolume: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        expectedPrice: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        cityId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'cities',
            key: 'id'
          }
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false
        },
        postalCode: {
          type: DataTypes.STRING,
          allowNull: true
        }, 
        status: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        companyId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'companies',
            key: 'id'
          }
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id'
          }
        },
      },
      {
        sequelize,
        modelName: "deposit"
      }
    );
  }
}

module.exports = DepositModel;
