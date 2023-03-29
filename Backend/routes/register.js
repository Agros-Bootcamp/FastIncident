import { Router } from "express";
import { register } from "../controllers/registerController.js";
import { listUsers } from "../controllers/userController.js";
import { verify } from '../middleware/verifyUsers.js'

export const registerRouter = Router()

registerRouter.post('/registerprueba', verify, register)
registerRouter.get('/usersprueba', verify, listUsers);