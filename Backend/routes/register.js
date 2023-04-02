import { Router } from "express";
import { register, register_by_role } from "../controllers/registerController.js";
import {verify} from '../middleware/verifyUsers.js'
import { verifyJWT } from "../middleware/verifyJWT.js";
import { validate_role_middleware } from "../middleware/validateRole.js";

export const registerRouter = Router()
export const registerByRole = Router()

registerRouter.post('/register',verify, register)

registerByRole.post('/register/:role', verify, verifyJWT, validate_role_middleware, register_by_role)