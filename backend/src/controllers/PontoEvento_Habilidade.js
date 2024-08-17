import Usuario_Habilidade from "../models/Usuario_Habilidade";

class PontoEvento_HabilidadeController {
  async recommend(req, res) {
    const usuario = await Usuario_Habilidade.findOne({
      where: { idUsuario: req.uid },
    });
  }
}

export default new PontoEvento_HabilidadeController();
