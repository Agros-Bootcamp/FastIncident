import express from 'express'
import cors from 'cors'
import { incidentRouter } from './routes/incidentRouter.js'

export const app = express()

app.use(cors())
app.use(express.json())
app.use(incidentRouter)