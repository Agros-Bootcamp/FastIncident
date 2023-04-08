import { Router } from "express";
import { readHooks } from "../controllers/hookController.js"

export const hookRoute = Router()

hookRoute.post('/hook', readHooks)