import Yup from "yup";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import { configDotenv } from "dotenv";
configDotenv();

import Usuario from "../models/Usuario.js";
import Usuario_Habilidade from "../models/Usuario_Habilidade.js";

import authConfig from "../config/auth.js";

class UsuarioController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string().email().required(),
      senha: Yup.string().min(6).required(),
      cep: Yup.string().required(),
      habilidades: Yup.array().of(Yup.number().min(1)).required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Erro de schema" });
    }

    const { email } = req.body;

    const userExists = await Usuario.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ error: "Usuário já existe" });
    }

    let { cep } = req.body;

    cep = cep.replace("-", "").replace(".", "");

    const usuario = await Usuario.create({
      nome: req.body.nome,
      email: email,
      senha_virtual: req.body.senha,
      cep: cep,
      idValidacao: uuidv4(),
    });

    const { id } = usuario;

    req.body.habilidades.forEach((habilidade) => {
      Usuario_Habilidade.create({ idUsuario: id, idHabilidade: habilidade });
    });

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
      subject: "Confirme seu email clicando no link abaixo.",
      text: `http://192.168.1.104:3000/api/email?token=${usuario.idValidacao}`,
    };

    transponder.sendMail(mailOptions, (error) => {
      if (error) {
        console.log(error);
      }
    });

    return res.send();
  }

  async validar(req, res) {
    const usuario = await Usuario.findOne({
      where: { idValidacao: req.params.uuid },
    });

    if (!usuario) {
      return res.status(400).json({ error: "Usuário não existe" });
    }

    await usuario.update({ validado: new Date(), idValidacao: null });
    return res.send();
  }

  async session(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      senha: Yup.string().min(6).required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Erro de schema" });
    }

    const { email } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(400).json({ error: "Usuário não existe" });
    }

    const { senha } = req.body;

    if (!(await usuario.checkPassword(senha))) {
      return res.status(402).json({ error: "Senha incorreta" });
    }

    return res.json({
      token: jwt.sign({}, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new UsuarioController();
