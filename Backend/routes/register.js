import { Router } from "express";
import { register, register_by_role } from "../controllers/registerController.js";
import {verify} from '../middleware/verifyUsers.js'
import { verifyJWT } from "../middleware/verifyJWT.js";
import { validate_admin } from "../middleware/validateRole.js";

export const registerRouter = Router()
export const registerByRole = Router()

registerRouter.post('/register',verify, register)


//Ruta protegida solo para administradores
registerByRole.post('/register/:role', verify, verifyJWT, validate_admin, register_by_role)