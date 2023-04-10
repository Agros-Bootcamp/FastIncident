import { Router } from "express";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { registerRol, listRols, updateRol, deleteRol } from '../controllers/rolController.js';


export const rolRoute = Router()
rolRoute.post('/registerrol', verifyJWT, registerRol)
rolRoute.get('/rolsall', verifyJWT, listRols)
rolRoute.put('/updaterol/:id', verifyJWT, updateRol)
rolRoute.delete('/deleterol/:id', verifyJWT, deleteRol)