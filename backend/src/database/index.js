import Sequelize from "sequelize";

import TipoUsuario from "../models/TipoUsuario.js";
import Usuario from "../models/Usuario.js";
import Habilidade from "../models/Habilidade.js";
import Usuario_Habilidade from "../models/Usuario_Habilidade.js";
import EventoCritico from "../models/EventoCritico.js";
import TipoEventoCritico from "../models/TipoEventoCritico.js";
import PontoEvento from "../models/PontoEvento.js";
import TipoPontoEvento from "../models/TipoPontoEvento.js";
import PontoEvento_Habilidade from "../models/PontoEvento_Habilidade.js";

import databaseConfig from "../config/database.js";

const models = [
  TipoUsuario,
  Usuario,
  Habilidade,
  Usuario_Habilidade,
  EventoCritico,
  TipoEventoCritico,
  PontoEvento,
  TipoPontoEvento,
  PontoEvento_Habilidade,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
