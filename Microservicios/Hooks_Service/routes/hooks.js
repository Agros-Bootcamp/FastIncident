import { Router } from "express";
import { readHookPush, readHookIssues } from "../controllers/hookController.js"

export const hookRoute = Router()

hookRoute.post('/hookPush', readHookPush)
hookRoute.post('/hookIssues', readHookIssues)
