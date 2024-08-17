import Yup from "yup";

import PontoEvento from "../models/PontoEvento.js";
import PontoEvento_Habilidade from "../models/PontoEvento_Habilidade.js";

class PontoEventoController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      idTipoPontoEvento: Yup.number().required(),
      idEventoCritico: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      habilidades: Yup.array().of(Yup.number().min(1)).required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Erro de schema" });
    }

    const { nome, idTipoPontoEvento, idEventoCritico, latitude, longitude } =
      req.body;

    const { id } = await PontoEvento.create({
      nome,
      idTipoPontoEvento,
      idEventoCritico,
      latitude,
      longitude,
    });

    req.body.habilidades.forEach(async (habilidade) => {
      await PontoEvento_Habilidade.create({
        idPontoEvento: id,
        idHabilidade: habilidade,
      });
    });

    return res.send();
  }

  async index(req, res) {
    const pontos = await PontoEvento.findAll({
      attributes: ["id", "nome", "latitude", "longitude"],
    });

    if (!pontos) {
      return res.status(400).json({ error: "Nenhum ponto encontrado" });
    }

    return res.json(pontos);
  }
}

export default new PontoEventoController();
