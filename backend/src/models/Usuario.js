import { Model, DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

class Usuario extends Model {
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

        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        senha_virtual: {
          type: DataTypes.VIRTUAL,
        },

        senha: {
          type: DataTypes.STRING,
        },

        cep: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        idValidacao: {
          type: DataTypes.STRING,
        },

        validado: {
          type: DataTypes.DATE,
        },
      },
      {
        sequelize,
      }
    );

    this.addHook("beforeSave", async (Usuario) => {
      if (Usuario.senha_virtual) {
        Usuario.senha = await bcrypt.hash(Usuario.senha_virtual, 8);
      }
    });

    return this;
  }

  async checkPassword(senha) {
    return await bcrypt.compare(senha, this.senha);
  }

  static associate(models) {
    this.belongsTo(models.TipoUsuario, { foreignKey: "idTipoUsuario" });
    this.hasMany(models.Usuario_Habilidade, { foreignKey: "idUsuario" });
  }
}

export default Usuario;
