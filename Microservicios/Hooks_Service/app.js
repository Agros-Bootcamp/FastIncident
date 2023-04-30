import express from 'express'
import cors from 'cors'
import { hookRoute } from './routes/hooks'

export const app = express()

app.use(cors())
app.use(express.json())
app.use(hookRoute)