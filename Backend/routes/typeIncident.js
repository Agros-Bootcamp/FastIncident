import { Router } from "express";
import { registerTypeIncident, listTypeIncident, updateTypeIncident, deleteTypeIncident } from '../controllers/typeIncidentController.js'
import { verify } from "../middleware/verifyUsers.js";

export const typeIncidentRoute = Router()
typeIncidentRoute.post('/registertypeincident', verify, registerTypeIncident)
typeIncidentRoute.get('/typeincidentsall', verify, listTypeIncident)
typeIncidentRoute.put('/updatetypeincident/:id', verify, updateTypeIncident)
typeIncidentRoute.delete('/deletetypeincident/:id', verify, deleteTypeIncident)