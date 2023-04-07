import { Router } from "express";
import { authTokens, refreshToken } from '../controllers/loginController.js'
import { verifyRefreshJWT } from "../middleware/verifyJWT.js";

export const routerLogin = Router()
export const routerJWT = Router()


routerLogin.post('/login', authTokens)
    .post('/refreshToken', verifyRefreshJWT, refreshToken)
