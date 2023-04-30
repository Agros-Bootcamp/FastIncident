import { Router } from "express";
import { mainController } from "../controllers/mainController.js";

export const incidentRouter = Router()

incidentRouter.get('/incidents/all', mainController)
              .get('/incidents/byField', mainController)
              .get('/incidents/byPK/:pk', mainController)
              .get('/incidents/allByFk', mainController)
              .post('/incidents', mainController)
              .delete('/incidents/:pk', mainController)
              .put('/incidents/:pk', mainController)