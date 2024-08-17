import TipoEventoCritico from "../models/TipoEventoCritico";

class TipoEventoCriticoController {
  async index(req, res) {
    const tipos = await TipoEventoCritico.findAll({
      attributes: ["id", "tipo"],
    });
    return res.json(tipos);
  }
}

export default new TipoEventoCriticoController();
