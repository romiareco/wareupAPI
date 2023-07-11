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
        comment: {
          type: DataTypes.STRING,
          allowNull: true
        },
        minimumBusinessPeriod: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        minimumBusinessVolume: {
          type: DataTypes.DECIMAL,
          allowNull: true
        },
        expectedPrice: {
          type: DataTypes.DECIMAL,
          allowNull: true
        },
        department: {
          type: DataTypes.STRING,
          allowNull: true
        },
        city: {
          type: DataTypes.STRING,
          allowNull: true
        },
        street: {
          type: DataTypes.STRING,
          allowNull: true
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
      },
      {
        sequelize,
        modelName: "deposit"
      }
    );
  }
}

module.exports = DepositModel;
