import { Router } from "express";

import authMiddleware from "../middlewares/auth.js";

import UserController from "../controllers/UsuarioController.js";
import HabilidadeController from "../controllers/HabilidadeController.js";
import TipoEventoCriticoController from "../controllers/TipoEventoCriticoController.js";
import EventoCriticoController from "../controllers/EventoCriticoController.js";

const routes = new Router();

routes.post("/user", UserController.store);
routes.get("/validade/:uuid", UserController.validar);
routes.post("/session", UserController.session);

routes.get("/skills", HabilidadeController.index);

routes.use(authMiddleware);

routes.get("/criticEventType", TipoEventoCriticoController.index);
routes.get("/criticsEvents/:uf", EventoCriticoController.index);
routes.post("/criticEvent", EventoCriticoController.store);

export default routes;
