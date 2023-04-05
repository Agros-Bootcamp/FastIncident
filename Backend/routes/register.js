import { Router } from "express";
import { register, register_by_role } from "../controllers/registerController.js";
import {verify} from '../middleware/verifyUsers.js'
import { verifyJWT } from "../middleware/verifyJWT.js";
import { validate_access } from "../middleware/validateRole.js";

export const registerRouter = Router()
export const registerByRole = Router()

//Ruta para registrar solo integrantes sin verificacion
registerRouter.post('/register',verify, register)

//Ruta protegida solo para administradores
registerByRole.post('/register/administrador', verify, verifyJWT, validate_access, register_by_role)