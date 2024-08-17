import Usuario_Habilidade from "../models/Usuario_Habilidade.js";
import PontoEvento_Habilidade from "../models/PontoEvento_Habilidade.js";
import Habilidade from "../models/Habilidade.js";

import recomendarPontoEvento from "../machines/recommendPontoEvent.js";

function agruparHabilidadesPorPontoEvento(habilidadesPontoEventos) {
  return habilidadesPontoEventos.reduce((acc, curr) => {
    const { idPontoEvento, idHabilidade } = curr;
    const pontoEvento = acc.find((pe) => pe.idPontoEvento === idPontoEvento);
    if (pontoEvento) {
      pontoEvento.idHabilidades.push(idHabilidade);
    } else {
      acc.push({
        idPontoEvento,
        idHabilidades: [idHabilidade],
      });
    }
    return acc;
  }, []);
}

class PontoEvento_HabilidadeController {
  async recommend(req, res) {
    try {
      const habilidadesUsuario = await Usuario_Habilidade.findAll({
        where: { idUsuario: req.uid },
        attributes: ["idHabilidade"],
        raw: true,
      });

      const habilidades = await Habilidade.findAll({
        attributes: ["id"],
        raw: true,
      });

      const habilidadesPontoEventos = await PontoEvento_Habilidade.findAll({
        attributes: ["idHabilidade", "idPontoEvento"],
        raw: true,
      });

      const habilidadesUsuarioIds = habilidadesUsuario.map(
        (item) => item.idHabilidade
      );
      const habilidadesIds = habilidades.map((item) => item.id);

      const habilidadesPontoEventosAgrupadas = agruparHabilidadesPorPontoEvento(
        habilidadesPontoEventos
      );

      const recomendado = recomendarPontoEvento(
        habilidadesUsuarioIds,
        habilidadesIds,
        habilidadesPontoEventosAgrupadas
      );

      return res.json(recomendado);
    } catch (error) {
      console.error("Erro ao recomendar pontos de evento:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new PontoEvento_HabilidadeController();
