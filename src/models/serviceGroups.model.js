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
      defaults: {title: 'Zona', code: 'ZONA', order: 1, showTitle:true, status: 1}
    });

    super.findOrCreate({where: { code: 'PISO' },
      defaults: {title: 'Piso', code: 'PISO', order: 2, showTitle:true, status: 1}
    });

    super.findOrCreate({where: { code: 'VARIOS' },
      defaults: {title: 'Varios', code: 'VARIOS', order: 3, showTitle:true, status: 1}
    });

    super.findOrCreate({where: { code: 'SEGUROS' },
      defaults: {title: 'Seguros', code: 'SEGUROS', order: 4, showTitle:true, status: 1}
    });
    super.findOrCreate({where: { code: 'CERT' },
      defaults: {title: 'Certificaciones', code: 'CERT', order: 5, showTitle:true, status: 1}
    });
    super.findOrCreate({where: { code: 'HAB' },
      defaults: {title: 'Habilitaciones', code: 'HAB', order: 6, showTitle:true, status: 1}
    });
    //super.create({title: 'Zona', code: 'ZONA', order: 1, showTitle:true, status: 1}); 
    //super.create({title: 'Piso', code: 'PISO', order: 2, showTitle:true, status: 1});
    //super.create({title: 'Varios', code: 'VARIOS', order: 3, showTitle:true, status: 1});
    //super.create({title: 'Seguros', code: 'SEGUROS', order: 4, showTitle:true, status: 1});
    //super.create({title: 'Certificaciones', code: 'CERT', order: 5, showTitle:true, status: 1});
    //super.create({title: 'Habilitaciones', code: 'HAB', order: 6, showTitle:true, status: 1});
  }
}

module.exports = ServiceGroupModel;


