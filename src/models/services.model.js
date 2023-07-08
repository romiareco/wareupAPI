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
    super.create({title: 'Techada', description: null, serviceGroupId:1, order: 1, status: 1}); 
    super.create({title: 'Descubierta', description: null, serviceGroupId:1, order: 2, status: 1});
    super.create({title: 'Temperatura controllada', description: null, serviceGroupId:1, order: 3, status: 1});
    super.create({title: 'Otros', description: null, serviceGroupId:1, order: 1, status: 1});

    super.create({title: 'Racksm', description: null, serviceGroupId:2, order: 1, status: 1}); 
    super.create({title: 'FlatStorage', description: null, serviceGroupId:2, order: 2, status: 1}); 

    super.create({title: 'Carga/descarga de mercaderia', description: null, serviceGroupId:3, order: 1, status: 1}); 
    super.create({title: 'Seguridad 24 horas', description: null, serviceGroupId:3, order: 2, status: 1});
    super.create({title: 'Camaras', description: null, serviceGroupId:3, order: 3, status: 1});
    super.create({title: 'Parking', description: null, serviceGroupId:3, order: 4, status: 1});
    super.create({title: 'Control de plagas', description: null, serviceGroupId:3, order: 5, status: 1});
    super.create({title: 'Etiquetados', description: null, serviceGroupId:3, order: 6, status: 1});
    super.create({title: 'Fraccionamiento/preparacion de pedidos', description: null, serviceGroupId:3, order: 7, status: 1});
    super.create({title: 'Software de gestion de stock WMS', description: null, serviceGroupId:3, order: 8, status: 1});
    super.create({title: 'Consolidacion/desconsolidacion', description: null, serviceGroupId:3, order: 9, status: 1});
    super.create({title: 'Cross-docking', description: null, serviceGroupId:3, order: 10, status: 1});
    super.create({title: 'Verificacion de carga', description: null, serviceGroupId:3, order: 11, status: 1});
    super.create({title: 'Otros', description: null, serviceGroupId:3, order: 12, status: 1});

    super.create({title: 'Algun Seguro...', description: null, serviceGroupId:4, order: 1, status: 1}); 

    super.create({title: 'ISO', description: null, serviceGroupId:5, order: 1, status: 1}); 
    super.create({title: 'OSSAS', description: null, serviceGroupId:5, order: 2, status: 1});
    super.create({title: 'Organico', description: null, serviceGroupId:5, order: 3, status: 1});
    super.create({title: 'OEC', description: null, serviceGroupId:5, order: 4, status: 1}); 
     
    super.create({title: 'MGAP', description: null, serviceGroupId:6, order: 1, status: 1}); 
    super.create({title: 'MSP', description: null, serviceGroupId:6, order: 2, status: 1});
    super.create({title: 'Bromatologia', description: null, serviceGroupId:6, order: 3, status: 1});
    super.create({title: 'DINIMA', description: null, serviceGroupId:6, order: 4, status: 1}); 
    super.create({title: 'Bomberos', description: null, serviceGroupId:6, order: 5, status: 1}); 
    super.create({title: 'Otras', description: null, serviceGroupId:6, order: 6, status: 1});
  } 
}   
module.exports = ServiceModel;
