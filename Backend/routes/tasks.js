import { Router } from "express";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { createTask, deleteTask, readOwnTasks, updateTask } from "../controllers/tasksController.js";


export const taskRoute = Router()

taskRoute.post('/createTask', verifyJWT, createTask)
     .patch('/task/:pk_id_task', verifyJWT, updateTask)
     .delete('/tasks/:pk_id_task', verifyJWT, deleteTask)
     .get('/tasks/:pk_id_user', verifyJWT, readOwnTasks)