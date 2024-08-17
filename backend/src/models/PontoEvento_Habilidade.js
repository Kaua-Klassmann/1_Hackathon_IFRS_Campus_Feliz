import { Model, DataTypes } from "sequelize";

class PontoEvento_Habilidade extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.PontoEvento, { foreignKey: "idPontoEvento" });
    this.belongsTo(models.Habilidade, { foreignKey: "idHabilidade" });
  }
}

export default PontoEvento_Habilidade;
