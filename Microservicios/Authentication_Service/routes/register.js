import { Router } from "express";
import { registerUser } from "../controllers/registerController.js";

export const registerRoute = Router()

registerRoute.post('/register', registerUser)