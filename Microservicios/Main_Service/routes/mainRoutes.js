import { Router } from "express";
import { mainController } from "../controller/mainController.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { qsTypeIncident } from "../middlewares/qsTypeIncident.js";
import { validate_admin } from "../middlewares/validateAccess.js";

export const mainRouter = Router()

mainRouter.get('/tasks/all', mainController)
          .get('/tasks/byPK/:pk', mainController)
          .get('/tasks/allByFk/fk_id_user/:payload', mainController)
          .post('/tasks', verifyJWT,mainController)
          .delete('/tasks/:pk', verifyJWT, mainController)
          .put('/tasks/:pk', verifyJWT , mainController)
        //Incidentes
          .get('/incidents/all', mainController)
          .get('/incidents/byPK/:pk', mainController)
          .get('/incidents/allByFk/:field/:payload', mainController)
          .post('/incidents', verifyJWT, mainController)
          .delete('/incidents/:pk', verifyJWT, mainController)
          .put('/incidents/:pk', verifyJWT, qsTypeIncident,mainController)
        //Autenticacion
          .post('/login', mainController)
          .post('/refresh', mainController)
          .post('/register', verifyJWT, validate_admin, mainController)
          .get('/typeIncidents', async (req, res) => {
            const result = await axios({
              method: 'GET',
              url: 'http://localhost:4001/typeIncident/all/',
          })
          res.json(result.data)
          })
          .post('/test', qsTypeIncident)