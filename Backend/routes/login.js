import { Router } from "express";
import { verify } from '../middleware/loginAuth.js'
import { authTokens } from '../controllers/loginController.js'
import { verifyJWT } from "../middleware/verifyJWT.js";
import { tb_rol_user, tb_user } from "../model/userProfile.js";

export const routerLogin = Router()

routerLogin.post('/login', authTokens)