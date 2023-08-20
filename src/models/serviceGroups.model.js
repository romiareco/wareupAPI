const Sequelize = require("sequelize");
const Model = Sequelize.Model;
class ServiceGroupModel extends Model {
  static init(sequelize, DataTypes) {
     let model = super.init(
      { 
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        code:{
          type: DataTypes.STRING,
          allowNull: false
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false
        }, 
        order: {
          type: DataTypes.INTEGER,
          allowNull: true
        },  
        showTitle: {
          type: DataTypes.BOOLEAN,
          allowNull: false
        }, 
        status: {
          type: DataTypes.INTEGER,
          allowNull: false
        },  
      },
      {
        sequelize,
        modelName: "serviceGroup"
      }
    ); 
  
    return model;
  }

  static loadInitialData() {

    super.findOrCreate({where: { code: 'ZONA' },
      defaults: {id:1, title: 'Zona', code: 'ZONA', order: 1, showTitle:true, status: 1}
    });

    super.findOrCreate({where: { code: 'PISO' },
      defaults: {id:2, title: 'Piso', code: 'PISO', order: 2, showTitle:true, status: 1}
    });

    super.findOrCreate({where: { code: 'VARIOS' },
      defaults: {id:3,title: 'Varios', code: 'VARIOS', order: 3, showTitle:true, status: 1}
    });

    super.findOrCreate({where: { code: 'SEGUROS' },
      defaults: {id:4, title: 'Seguros', code: 'SEGUROS', order: 4, showTitle:true, status: 1}
    });
    super.findOrCreate({where: { code: 'CERT' },
      defaults: {id:5, title: 'Certificaciones', code: 'CERT', order: 5, showTitle:true, status: 1}
    });
    super.findOrCreate({where: { code: 'HAB' },
      defaults: {id:6, title: 'Habilitaciones', code: 'HAB', order: 6, showTitle:true, status: 1}
    });

    super.findOrCreate({where: { code: 'DAYS' },
      defaults: {id:7, title: 'Dias', code: 'DAYS', order: 7, showTitle:true, status: 1}
    });
  }
}

module.exports = ServiceGroupModel;


