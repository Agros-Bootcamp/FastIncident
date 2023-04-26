import express from 'express'
import cors from 'cors'
import {config} from 'dotenv'
import { hookRoute } from './routes/hooks'

config()

export const app = express()

app.use(cors())
app.use(express.json())
app.use(hookRoute)