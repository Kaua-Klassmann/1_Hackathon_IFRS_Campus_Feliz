import { Model, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";

class PontoEvento extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: uuidv4,
          primaryKey: true,
        },
        nome: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        latitude: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },
        longitude: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.TipoPontoEvento, {
      foreignKey: "idTipoPontoEvento",
    });
    this.belongsTo(models.EventoCritico, {
      foreignKey: "idEventoCritico",
    });
  }
}

export default PontoEvento;
