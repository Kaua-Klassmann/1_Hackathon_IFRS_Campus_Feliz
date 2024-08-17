import { Model, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";

class EventoCritico extends Model {
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

        cep: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        estado: {
          type: DataTypes.STRING,
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
    this.belongsTo(models.TipoEventoCritico, {
      foreignKey: "idTipoEventoCritico",
    });
  }
}

export default EventoCritico;
