import { Router } from "express";
import { registerRol, listRols, updateRol, deleteRol } from '../controllers/rolController.js';


export const rolRoute = Router()
rolRoute.post('/registerrol', registerRol)
rolRoute.get('/rolsall', listRols)
rolRoute.put('/updaterol/:id', updateRol)
rolRoute.delete('/deleterol/:id', deleteRol)