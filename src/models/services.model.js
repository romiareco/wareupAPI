const Sequelize = require("sequelize");
const Model = Sequelize.Model;
class ServiceModel extends Model {
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
          allowNull: false
        }, 
        status: {
          type: DataTypes.INTEGER,
          allowNull: false
        },  
      },
      {
        sequelize,
        modelName: "service"
      }
    );
  }

  static loadInitialData(sequelize, DataTypes) {
    super.create({name: 'Neuquen',order_: 0});
  }
}

module.exports = ServiceModel;
