import { Router } from "express";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { registerTypeIncident, listTypeIncident, updateTypeIncident, deleteTypeIncident } from '../controllers/typeIncidentController.js'


export const typeIncidentRoute = Router()
typeIncidentRoute.post('/registertypeincident', verifyJWT, registerTypeIncident)
typeIncidentRoute.get('/typeincidentsall', verifyJWT, listTypeIncident)
typeIncidentRoute.put('/updatetypeincident/:id', verifyJWT, updateTypeIncident)
typeIncidentRoute.delete('/deletetypeincident/:id', verifyJWT, deleteTypeIncident)