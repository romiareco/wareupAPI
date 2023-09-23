const Sequelize = require("sequelize");
const Model = Sequelize.Model;
class BookingRequestModel extends Model {
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
          allowNull: true
        },
        depositId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'deposits',
            key: 'id'
          }
        },
        status: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: true, //momentaneo, porqe si no tenog qe recrear la base.
          references: {
            model: 'users',
            key: 'id'
          }
        },
        dateFrom: {
          type: DataTypes.DATE,
          allowNull: true
        },
        dateTo: {
          type: DataTypes.DATE,
          allowNull: true
        },
        totalM3: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
      },
      {
        sequelize,
        modelName: "bookingRequest"
      }
    );
  }
}

module.exports = BookingRequestModel;
