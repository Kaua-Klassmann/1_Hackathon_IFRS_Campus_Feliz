import { Model, DataTypes } from "sequelize";

class TipoPontoEvento extends Model {
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
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.PontoEvento, {
      foreignKey: "idTipoPontoEvento",
    });
  }
}

export default TipoPontoEvento;
