import { Router } from "express";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { registerIncident, listIncidents, updateIncident, deleteIncident } from '../controllers/incidentController.js';


export const incidentRoute = Router()
incidentRoute.post('/registerIncident', verifyJWT, registerIncident)
incidentRoute.get('/incidentsall', verifyJWT, listIncidents)
incidentRoute.put('/updateincident/:id', verifyJWT, updateIncident)
incidentRoute.delete('/deleteincident/:id', verifyJWT, deleteIncident)
