import { Router } from "express";
import { listUsers } from '../controllers/userController.js';
import { register } from "../controllers/registerController.js";
import { verify } from '../middleware/verifyUsers.js'



export const userRouter = Router()
userRouter.post('/register', verify, register)
userRouter.get('/user', verify, listUsers);

