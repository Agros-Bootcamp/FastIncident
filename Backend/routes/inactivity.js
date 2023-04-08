import { Router } from "express";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { getInactiveUsers } from "../controllers/inactivityController.js"

export const inactivityRoute = Router()
inactivityRoute.get('/inactivityusersall', verifyJWT, getInactiveUsers)