import { Router } from "express";
import { listUsers, updateUser, registerUser, registerUserByRole, deleteUser } from '../controllers/userController.js';
import { verify } from '../middleware/verifyUsers.js'
import { verifyJWT } from '../middleware/verifyJWT.js'
import { validate_access } from '../middleware/validateRole.js'



export const userRouter = Router()
userRouter.post('/registeruser', verify, registerUser)
userRouter.post('/registerUser/Administrador', verify, verifyJWT, validate_access, registerUserByRole)
userRouter.get('/usersall', verify, listUsers);
userRouter.put('/updateuser/:id', verify, updateUser);
userRouter.delete('/deleteuser/:id', verify, deleteUser);
