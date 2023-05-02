import { Router } from "express";
import { mainController } from "../controllers/mainController.js";

export const incidentRouter = Router()

incidentRouter.get('/incidents/all', mainController)
              .get('/incidents/byPK/:pk', mainController)
              .get('/incidents/allByFk/:field/:payload', mainController)
              .post('/incidents', mainController)
              .delete('/incidents/:pk', mainController)
              .put('/incidents/:pk', mainController)