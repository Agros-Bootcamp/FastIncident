import express from 'express'
import cors from 'cors'
import {config} from 'dotenv'
import { loginRouter } from './routes/login.js'
import { registerRoute } from './routes/register.js'

config()

export const app = express()

app.use(cors())
app.use(express.json())
app.use(loginRouter)
app.use(registerRoute)