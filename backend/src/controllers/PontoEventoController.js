import Yup from "yup";

import PontoEvento from "../models/PontoEvento.js";

class PontoEventoController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      idTipoPontoEvento: Yup.number().required(),
      idEventoCritico: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Erro de schema" });
    }

    const { nome, idTipoPontoEvento, idEventoCritico, latitude, longitude } =
      req.body;

    await PontoEvento.create({
      nome,
      idTipoPontoEvento,
      idEventoCritico,
      latitude,
      longitude,
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
