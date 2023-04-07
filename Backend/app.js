import express from 'express'
//import { userRouter, registerUserByRoleRoute } from './routes/user.js'
import { userRouter } from './routes/user.js'
import { rolRoute } from './routes/rol.js'
import { routerJWT, routerLogin } from './routes/login.js'
import { taskRoute } from './routes/tasks.js'
import { typeIncidentRoute } from './routes/typeIncident.js'
import { incidentRoute } from './routes/incident.js'
import { config } from 'dotenv'
import cors from 'cors'

config()

export const app = express()

app.use(cors())

app.use(express.json())
app.use(routerLogin)
app.use(routerJWT)
//app.use(registerUserByRoleRoute)
app.use(userRouter)
app.use(rolRoute)
app.use(taskRoute)
app.use(typeIncidentRoute)
app.use(incidentRoute)