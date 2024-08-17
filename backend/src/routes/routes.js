import { Router } from "express";

import authMiddleware from "../middlewares/auth.js";

import UserController from "../controllers/UsuarioController.js";
import HabilidadeController from "../controllers/HabilidadeController.js";
import EventoCriticoController from "../controllers/EventoCriticoController.js";
import TipoEventoCriticoController from "../controllers/TipoEventoCriticoController.js";
import PontoEventoController from "../controllers/PontoEventoController.js";

const routes = new Router();

routes.post("/user", UserController.store);
routes.get("/validade/:uuid", UserController.validar);
routes.post("/session", UserController.session);

routes.get("/skills", HabilidadeController.index);

routes.use(authMiddleware);

routes.get("/typesCriticsEvents", TipoEventoCriticoController.index);
routes.get("/pointsEvents", PontoEventoController.index);
routes.post("/pointEvent", PontoEventoController.store);
routes.get("/criticsEvents/:uf", EventoCriticoController.index);
routes.post("/criticEvent", EventoCriticoController.store);

export default routes;
