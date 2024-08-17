import Usuario_Habilidade from "../models/Usuario_Habilidade.js";
import PontoEvento_Habilidade from "../models/PontoEvento_Habilidade.js";
import Habilidade from "../models/Habilidade.js";

import recomendarPontoEvento from "../machines/recommendPontoEvent.js";

class PontoEvento_HabilidadeController {
  async recommend(req, res) {
    const habilidadesUsuario = await Usuario_Habilidade.findOne({
      where: { idUsuario: req.uid },
      attributes: ["idHabilidade"],
    });

    const habilidades = await Habilidade.findAll({
      attributes: ["id"],
    });

    const habilidadesPontoEventos = await PontoEvento_Habilidade.findAll({
      attributes: ["idHabilidade", "idPontoEvento"],
    });

    const recomendado = recomendarPontoEvento(
      habilidadesUsuario,
      habilidades,
      habilidadesPontoEventos
    );

    return res.json(recomendado);
  }
}

export default new PontoEvento_HabilidadeController();
