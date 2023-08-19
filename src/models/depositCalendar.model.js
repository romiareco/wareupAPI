const Sequelize = require("sequelize");
const Model = Sequelize.Model;
class DepositCalendarModel extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      { 
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        dateFrom: {
          type: DataTypes.DATE,
          allowNull: false
        },
        dateTo: {
          type: DataTypes.DATE,
          allowNull: false
        },
        totalM3: {
          type: DataTypes.STRING,
          allowNull: true
        }, 
        depositId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'deposits',
            key: 'id'
          }
        }, 
      },
      {
        sequelize,
        modelName: "depositCalendar"
      }
    );
  }
}

module.exports = DepositCalendarModel;
