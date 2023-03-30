import express from 'express'
import { registerRouter } from './routes/register.js'
import { userRouter } from './routes/user.js'
import { rolRoute } from './routes/rol.js'
import { routerLogin } from './routes/login.js'
import { config } from 'dotenv'
import cors from 'cors'

config()

export const app = express()

app.use(cors())

app.use(express.json())
app.use(routerLogin)
app.use(registerRouter)
app.use(userRouter)
app.use(rolRoute)