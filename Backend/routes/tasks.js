import { Router } from "express";
import { verifyJWT } from "../middleware/verifyJWT";
import { create_task, delete_tasks, read_own_tasks, update_tasks } from "../controllers/tasksController";


export const tasks = Router()

tasks.post('/createTask1', verifyJWT, create_task)
     .patch('/task/:pk_id_task', verifyJWT, update_tasks)
     .delete('/tasks/:pk_id_task', verifyJWT, delete_tasks)
     .get('/tasks/:pk_id_user', verifyJWT, read_own_tasks)