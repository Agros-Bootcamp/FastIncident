import { Router } from "express";
import { register } from "../controllers/registerController.js";
import {verify} from '../middleware/verifyUsers.js'

export const registerRouter = Router()

registerRouter.post('/register',verify,register)