import TipoEventoCritico from "../models/TipoEventoCritico.js";

class TipoEventoCriticoController {
  async index(req, res) {
    const tipos = await TipoEventoCritico.findAll({
      attributes: ["id", "tipo"],
    });
    return res.json(tipos);
  }
}

export default new TipoEventoCriticoController();
