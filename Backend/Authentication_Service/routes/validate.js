import {Router} from 'express'
import { verifyJWT } from '../Middleware/verifyJWT.js'

export const protectedRoutes = Router()

protectedRoutes.post('/tasks/:method', (req, res) => {
    res.json(req.params)
})