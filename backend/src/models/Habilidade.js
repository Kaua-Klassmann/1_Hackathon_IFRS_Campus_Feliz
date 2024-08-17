import { Model, DataTypes } from "sequelize";

class Habilidade extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },

        nome: {
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
    this.hasMany(models.Usuario_Habilidade, { foreignKey: "idHabilidade" });
  }
}

export default Habilidade;
