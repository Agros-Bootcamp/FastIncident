import { Router } from "express";
import { authTokens, refreshToken } from '../controllers/loginController.js'
import { verifyRefreshJWT } from "../middleware/verifyJWT.js";

export const routerLogin = Router()


routerLogin.post('/login', authTokens)
    .post('/refreshToken', verifyRefreshJWT, refreshToken)
