const Sequelize = require("sequelize");
const Model = Sequelize.Model;
class ServiceGroupModel extends Model {
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
        order: {
          type: DataTypes.INTEGER,
          allowNull: false
        }, 
        status: {
          type: DataTypes.INTEGER,
          allowNull: false
        },  
      },
      {
        sequelize,
        modelName: "ServiceGroup"
      }
    );
  }

  static loadInitialData(sequelize, DataTypes) {
    super.create({name: 'Neuquen',order_: 0});
  }
}

module.exports = ServiceGroupModel;
