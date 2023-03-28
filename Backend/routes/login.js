import { Router } from "express";
import { verify } from '../middleware/loginAuth.js'
import { authTokens } from '../controllers/loginController.js'

export const routerLogin = Router()

routerLogin.post('/login',verify, authTokens)