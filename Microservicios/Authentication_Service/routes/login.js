import { Router } from "express";
import { authTokens } from "../controllers/loginController.js";

export const loginRouter = Router()

loginRouter.all('/login', authTokens)