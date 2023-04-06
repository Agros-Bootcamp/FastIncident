import { Router } from "express";
import { authTokens, refreshToken } from '../controllers/loginController.js'

export const routerLogin = Router()
export const routerJWT = Router()

routerLogin.post('/login', authTokens)
           .post('/refreshToken', refreshToken)