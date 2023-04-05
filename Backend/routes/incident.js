import { Route, Router } from "express";
import { registerIncident, listIncidents, updateIncident, deleteIncident } from '../controllers/incidentController.js';
import { verify } from "../middleware/verifyUsers.js";

export const incidentRoute = Router()
incidentRoute.post('/registerIncident', verify, registerIncident)
incidentRoute.get('/incidentsall', verify, listIncidents)
incidentRoute.put('/updateincident/:id', verify, updateIncident)
incidentRoute.delete('/deleteincident/:id', verify, deleteIncident)
//Cambio