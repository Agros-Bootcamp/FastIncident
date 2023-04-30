import { Router } from "express";
import { mainController } from "../controllers/mainController.js";

export const ormRoute = Router()

ormRoute.all('/users/:action', mainController)
        .all('/tasks/:action',mainController)
        .all('/rol/:action', mainController)
        .all('/typeIncident/:action', mainController)
        .all('/incidents/:action', mainController)
        .all('/refresh/:action', mainController)