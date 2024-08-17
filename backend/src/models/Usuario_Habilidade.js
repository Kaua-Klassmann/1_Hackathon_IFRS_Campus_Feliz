import { Model, DataTypes } from "sequelize";

class Usuario_Habilidade extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: "idUsuario" });
    this.belongsTo(models.Habilidade, { foreignKey: "idHabilidade" });
  }
}

export default Usuario_Habilidade;
