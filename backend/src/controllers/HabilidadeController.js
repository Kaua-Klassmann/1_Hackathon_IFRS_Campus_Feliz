import Habilidade from "../models/Habilidade.js";

class HabilidadeController {
  async index(req, res) {
    const habilidades = await Habilidade.findAll({
      attributes: ["id", "nome"],
    });
    return res.json(habilidades);
  }
}

export default new HabilidadeController();
