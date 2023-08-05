const Sequelize = require("sequelize");
const Model = Sequelize.Model;
class CityModel extends Model {
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
        departmentId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'departments',
            key: 'id'
          }
        },
      },
      {
        sequelize,
        modelName: "city"
      }
    );
  }

  static loadInitialData() {

    super.findOrCreate({where: { id: 1 }, defaults: {id: 1, title: 'Ciudad de la costa', visible: true, departmentId: 1} });
    super.findOrCreate({where: { id: 2 }, defaults: {id: 2, title: 'Aguada', visible: true, departmentId: 2} }); 
    super.findOrCreate({where: { id: 3 }, defaults: {id: 3, title: 'Cordon', visible: true, departmentId: 2} }); 
    super.findOrCreate({where: { id: 4 }, defaults: {id: 4, title: 'Pocitos', visible: true, departmentId: 2} }); 
    super.findOrCreate({where: { id: 5 }, defaults: {id: 5, title: 'Otro', visible: true, departmentId: 1} }); 
    super.findOrCreate({where: { id: 6 }, defaults: {id: 6, title: 'Otro', visible: true, departmentId: 2} }); 
  }
}
module.exports = CityModel;
