import { Router } from "express";
import { registerTypeIncident, listTypeIncident, updateTypeIncident, deleteTypeIncident } from '../controllers/typeIncidentController.js'


export const typeIncidentRoute = Router()
typeIncidentRoute.post('/registertypeincident', registerTypeIncident)
typeIncidentRoute.get('/typeincidentsall', listTypeIncident)
typeIncidentRoute.put('/updatetypeincident/:id', updateTypeIncident)
typeIncidentRoute.delete('/deletetypeincident/:id', deleteTypeIncident)