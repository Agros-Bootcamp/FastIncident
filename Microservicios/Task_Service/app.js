import express from 'express'
import cors from 'cors'
import {config} from 'dotenv'
import { taskRouter } from './routes/taskRouter.js'

config()

export const app = express()

app.use(cors())
app.use(express.json())
app.use(taskRouter)