import { Router } from "express";
import { authTokens } from "../controllers/loginController.js";

export const loginRouter = Router()

loginRouter.all('/login', authTokens)

//Recibe un objeto de la siguiente forma:
// req.body : { email_user: email, password_user: password }
//El controlador authTokens verifica su validez en la base de datos y entrega los tokens de acceso y refresco