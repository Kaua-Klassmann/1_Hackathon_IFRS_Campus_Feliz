import { Model, DataTypes } from "sequelize";

class TipoEventoCritico extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },

        tipo: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        rangeEvento: {
          type: DataTypes.DECIMAL(10, 2),
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
    this.hasMany(models.EventoCritico, { foreignKey: "idTipoEventoCritico" });
  }
}

export default TipoEventoCritico;
