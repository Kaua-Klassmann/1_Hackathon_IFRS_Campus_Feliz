import Yup from "yup";
import nodemailer from "nodemailer";

import axios from "axios";

import { configDotenv } from "dotenv";
configDotenv();

import EventoCritico from "../models/EventoCritico.js";
import TipoEventoCritico from "../models/TipoEventoCritico.js";

class EventoCriticoController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      cep: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      idTipoEventoCritico: Yup.number().min(1).required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Erro de schema" });
    }

    let { nome, cep, idTipoEventoCritico } = req.body;

    cep = cep.replace(".", "").replace("-", "");

    console.log(cep);

    const data = await axios
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.data);

    console.log(data);

    await EventoCritico.create({
      nome,
      cep,
      idTipoEventoCritico,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      estado: data.uf,
    });

    const usuarios = await EventoCritico.findAll({
      where: {
        cep,
      },
    });

    usuarios.forEach((usuario) => {
      const { email } = usuario;

      const transponder = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "PERIGO!",
        text: `Nova calamidade foi registrada em sua cidade!`,
      };

      transponder.sendMail(mailOptions, (error) => {
        if (error) {
          console.log(error);
        }
      });
    });

    return res.send();
  }

  async index(req, res) {
    const eventos = await EventoCritico.findAll({
      where: {
        estado: req.params.uf,
      },
      attributes: ["nome", "latitude", "longitude"],
      include: [
        {
          model: TipoEventoCritico,
          as: "tipoEventoCritico",
          attributes: ["tipo", "rangeEvento"],
        },
      ],
    });

    if (!eventos) {
      return res.status(400).json({ error: "Eventos não encontrados" });
    }

    return res.json(eventos);
  }
}

export default new EventoCriticoController();
