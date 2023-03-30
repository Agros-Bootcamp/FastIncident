import { Router } from "express";
import { listUsers, updateUser, registerUser, deleteUser } from '../controllers/userController.js';
import { verify } from '../middleware/verifyUsers.js'



export const userRouter = Router()
userRouter.post('/registeruser', verify, registerUser)
userRouter.get('/usersall', verify, listUsers);
userRouter.put('/updateuser/:id', verify, updateUser);
userRouter.delete('/deleteuser/:id', verify, deleteUser);
