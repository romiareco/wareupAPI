
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

//const image = require("./attachments");

class DepositImageModel extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      { 
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        depositId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'deposits',
            key: 'id'
          }
        },
        image: {
          type: DataTypes.BLOB('long'),
          get () {
              let data = this.getDataValue('image');
              return data ? data.toString('base64'): '';
          }
        }
      },
      {
        sequelize,
        modelName: "depositImage"
      }
    );
  }
}

module.exports = DepositImageModel;
