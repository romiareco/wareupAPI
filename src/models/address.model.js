const Sequelize = require("sequelize");
const Model = Sequelize.Model;
class AddressModel extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      { 
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },  
        city: {
          type: DataTypes.STRING,
          allowNull: false
        },
        street: {
          type: DataTypes.STRING,
          allowNull: false
        },
        postalCode: {
          type: DataTypes.STRING,
          allowNull: false
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: false
        }, 
        type: {
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
        } 
      },
      {
        sequelize,
        modelName: "address"
      }
    );
  }
}

module.exports = AddressModel;
