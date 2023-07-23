const Sequelize = require("sequelize");
const Model = Sequelize.Model;
class CompanyModel extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {  
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        userId: {  
          type: DataTypes.INTEGER,
          allowNull: false,  
          references: {
              model: 'users',
              key: 'id'
          }
        }, 
        RUT: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: 'rutIndex'
        },
        businessName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: false
        },
        contactName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        position: {
          type: DataTypes.STRING,
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
          allowNull: true
        },
        postalCode: {
          type: DataTypes.STRING,
          allowNull: true
        }, 
        status: {
          type: DataTypes.INTEGER,
          allowNull: false
        }
      },
      {
        sequelize,
        modelName: "company"
      }
    );
  }
}

module.exports = CompanyModel;
