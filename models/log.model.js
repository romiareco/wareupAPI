const Sequelize = require("sequelize");
const Model = Sequelize.Model;
class LogModel extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false
        },
        type: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        created_date: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW
        }
      },
      {
        sequelize,
        modelName: "log"
      }
    );
  }
}

module.exports = LogModel;
