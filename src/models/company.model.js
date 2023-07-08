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
        name: {
          type: DataTypes.STRING,
          allowNull: false
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
        contactPhone: {
          type: DataTypes.STRING,
          allowNull: false
        },
        contactEmail: {
          type: DataTypes.STRING,
          allowNull: false
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
