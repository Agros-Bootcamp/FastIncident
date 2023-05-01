import { Router } from "express";
import { mainController } from "../controller/mainController.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { qsTypeIncident } from "../middlewares/qsTypeIncident.js";
import { validate_admin } from "../middlewares/validateAccess.js";

export const mainRouter = Router()

mainRouter.get('/tasks/byPK/:pk', mainController)
          .get('/tasks/:action', mainController)
          .delete('/tasks/:pk', mainController)
          .put('/tasks/:pk', mainController)
          .post('/tasks', verifyJWT,mainController)
        //Incidentes
          .get('/incidents/byPK/:pk', mainController)
          .get('/incidents/:action', mainController)
          .delete('/incidents/:pk', mainController)
          .put('/incidents/:pk', mainController)
          .post('/incidents/', qsTypeIncident, mainController)
        //Autenticacion
          .post('/login', mainController)
          .post('/refresh', mainController)
          .post('/register', verifyJWT, validate_admin, mainController)
          .post('/test', qsTypeIncident)