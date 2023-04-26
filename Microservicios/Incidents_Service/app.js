import express from 'express'
import cors from 'cors'
import {config} from 'dotenv'

config()

export const app = express()

app.use(cors())
app.use(express.json())