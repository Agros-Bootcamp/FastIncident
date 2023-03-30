import { Router } from "express";
import { registerRol, listRols, updateRol, deleteRol } from '../controllers/rolController.js';
import { verify } from "../middleware/verifyUsers.js"

export const rolRoute = Router()
rolRoute.post('/registerrol', verify, registerRol)
rolRoute.get('/rolsall', verify, listRols)
rolRoute.put('/updaterol/:id', verify, updateRol)
rolRoute.delete('/deleterol/:id', verify, deleteRol)