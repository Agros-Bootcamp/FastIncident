import express from 'express'
import { registerByRole, registerRouter } from './routes/register.js'
import { routerJWT, routerLogin } from './routes/login.js'
import {config} from 'dotenv'
import cors from 'cors'

config()

export const app = express()

app.use(cors())

app.use(express.json())
app.use(routerLogin)
app.use(routerJWT)
app.use(registerRouter)
app.use(registerByRole)