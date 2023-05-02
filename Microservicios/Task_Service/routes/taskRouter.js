import { Router } from 'express'
import { mainController } from '../controllers/taskController.js'


export const taskRouter = Router()

taskRouter.get('/tasks/all', mainController)
          .get('/tasks/byPK/:pk', mainController)
          .get('/tasks/allByFk/:field/:payload', mainController)
          .post('/tasks', mainController)
          .delete('/tasks/:pk', mainController)
          .put('/tasks/:pk', mainController)