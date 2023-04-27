import { Router } from "express";
import { registerUser } from "../controllers/registerController.js";
import { internalVerifyJWT, validate_admin } from "../Middleware/verifyJWT.js";

export const registerRoute = Router()

registerRoute.post('/register', internalVerifyJWT, validate_admin, registerUser)