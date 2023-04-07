import { Router } from "express";
import { registerIncident, listIncidents, updateIncident, deleteIncident } from '../controllers/incidentController.js';


export const incidentRoute = Router()
incidentRoute.post('/registerIncident', registerIncident)
incidentRoute.get('/incidentsall', listIncidents)
incidentRoute.put('/updateincident/:id', updateIncident)
incidentRoute.delete('/deleteincident/:id', deleteIncident)
//Cambio