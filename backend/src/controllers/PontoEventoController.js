import Yup from "yup";

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
}

export default new PontoEventoController();
