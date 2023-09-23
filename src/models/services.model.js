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
          allowNull: true
        },
        serviceGroupId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'serviceGroups',
            key: 'id'
          }
        },
        order: {
          type: DataTypes.INTEGER,
          allowNull: true
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

  static loadInitialData() { 

    super.findOrCreate({where: { title: 'Abierto' }, defaults: {title: 'Abierto', description: null, serviceGroupId:1, order: 1, status: 1} });
    super.findOrCreate({where: { title: 'Cerrado' }, defaults: {title: 'Cerrado', description: null, serviceGroupId:1, order: 2, status: 1} });
    super.findOrCreate({where: { title: 'Temperatura controlada' }, defaults:  {title: 'Temperatura controlada', description: null, serviceGroupId:1, order: 3, status: 1} });
    //super.findOrCreate({where: { title: 'Otros' }, defaults:  {title: 'Otros', description: null, serviceGroupId:1, order: 1, status: 1} });
    //super.findOrCreate({where: { title: 'Racksm' }, defaults:  {title: 'Racksm', description: null, serviceGroupId:2, order: 1, status: 1} });
    //super.findOrCreate({where: { title: 'FlatStorage' }, defaults:  {title: 'FlatStorage', description: null, serviceGroupId:2, order: 2, status: 1} });
   
    super.findOrCreate({where: { title: 'Carga/descarga de mercaderia' }, defaults:  {title: 'Carga/descarga de mercaderia', description: null, serviceGroupId:3, order: 1, status: 1}}); 
    super.findOrCreate({where: { title: 'Seguridad 24 horas' }, defaults:  {title: 'Seguridad 24 horas', description: null, serviceGroupId:3, order: 2, status: 1}});
    super.findOrCreate({where: { title: 'Camaras' }, defaults:  {title: 'Camaras', description: null, serviceGroupId:3, order: 3, status: 1}});
    //super.findOrCreate({where: { title: 'Parking' }, defaults:  {title: 'Parking', description: null, serviceGroupId:3, order: 4, status: 1}});
    super.findOrCreate({where: { title: 'Control de plagas' }, defaults:  {title: 'Control de plagas', description: null, serviceGroupId:3, order: 5, status: 1}});
    //super.findOrCreate({where: { title: 'Etiquetados' }, defaults:  {title: 'Etiquetados', description: null, serviceGroupId:3, order: 6, status: 1}});
    super.findOrCreate({where: { title: 'Fraccionamiento/preparacion de pedidos' }, defaults:  {title: 'Fraccionamiento/preparacion de pedidos', description: null, serviceGroupId:3, order: 7, status: 1}});
    super.findOrCreate({where: { title: 'Software de gestion de stock WMS' }, defaults:  {title: 'Software de gestion de stock WMS', description: null, serviceGroupId:3, order: 8, status: 1}});
    super.findOrCreate({where: { title: 'Consolidacion/desconsolidacion' }, defaults:  {title: 'Consolidacion/desconsolidacion', description: null, serviceGroupId:3, order: 9, status: 1}});
    super.findOrCreate({where: { title: 'Cross-docking' }, defaults:  {title: 'Cross-docking', description: null, serviceGroupId:3, order: 10, status: 1}});
    super.findOrCreate({where: { title: 'Verificacion de carga' }, defaults:  {title: 'Verificacion de carga', description: null, serviceGroupId:3, order: 11, status: 1}});
    
    super.findOrCreate({where: { title: 'ISO' }, defaults:  {title: 'ISO', description: null, serviceGroupId:5, order: 1, status: 1}}); 
    super.findOrCreate({where: { title: 'OSSAS' }, defaults:  {title: 'OSSAS', description: null, serviceGroupId:5, order: 2, status: 1}});
    super.findOrCreate({where: { title: 'Organico' }, defaults:  {title: 'Organico', description: null, serviceGroupId:5, order: 3, status: 1}});
    super.findOrCreate({where: { title: 'OEC' }, defaults:  {title: 'OEC', description: null, serviceGroupId:5, order: 4, status: 1}}); 
     
    super.findOrCreate({where: { title: 'MGAP' }, defaults:  {title: 'MGAP', description: null, serviceGroupId:6, order: 1, status: 1}});
    super.findOrCreate({where: { title: 'MSP' }, defaults:  {title: 'MSP', description: null, serviceGroupId:6, order: 2, status: 1}});
    super.findOrCreate({where: { title: 'Bromatologia' }, defaults:  {title: 'Bromatologia', description: null, serviceGroupId:6, order: 3, status: 1}});
    super.findOrCreate({where: { title: 'DINIMA' }, defaults:  {title: 'DINIMA', description: null, serviceGroupId:6, order: 4, status: 1}});
    super.findOrCreate({where: { title: 'Bomberos' }, defaults:  {title: 'Bomberos', description: null, serviceGroupId:6, order: 5, status: 1}});
    super.findOrCreate({where: { title: 'Otras' }, defaults:  {title: 'Otras', description: null, serviceGroupId:6, order: 6, status: 1}});

    super.findOrCreate({where: { title: 'Lunes' }, defaults:  {title: 'Lunes', description: null, serviceGroupId:7, order: 1, status: 1}});
    super.findOrCreate({where: { title: 'Martes' }, defaults:  {title: 'Martes', description: null, serviceGroupId:7, order: 2, status: 1}});
    super.findOrCreate({where: { title: 'Miercoles' }, defaults:  {title: 'Miercoles', description: null, serviceGroupId:7, order: 3, status: 1}});
    super.findOrCreate({where: { title: 'Jueves' }, defaults:  {title: 'Jueves', description: null, serviceGroupId:7, order: 4, status: 1}});
    super.findOrCreate({where: { title: 'Viernes' }, defaults:  {title: 'Viernes', description: null, serviceGroupId:7, order: 5, status: 1}});
    super.findOrCreate({where: { title: 'Sabado' }, defaults:  {title: 'Sabado', description: null, serviceGroupId:7, order: 6, status: 1}});
    super.findOrCreate({where: { title: 'Domingo' }, defaults:  {title: 'Domingo', description: null, serviceGroupId:7, order: 6, status: 1}});
  } 
}   
module.exports = ServiceModel;
