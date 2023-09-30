const Sequelize = require("sequelize");
const Model = Sequelize.Model;
class DepartmentModel extends Model {
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
        visible: {
          type: DataTypes.BOOLEAN,
          allowNull: false
        },  
      },
      {
        sequelize,
        modelName: "department"
      }
    );
  }

  static loadInitialData() { 

    super.findOrCreate({where: { id: 1 }, defaults: {id: 1, title: 'Canelones', visible: true} }); 
    super.findOrCreate({where: { id: 2 }, defaults: {id: 2, title: 'Montevideo', visible: true} });
    super.findOrCreate({where: { id: 3 }, defaults: {id: 3, title: 'San José', visible: true} });
  } 
}   
module.exports = DepartmentModel;
