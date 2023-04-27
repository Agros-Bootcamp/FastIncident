import {Router} from 'express'
import { verifyJWT } from '../Middleware/verifyJWT.js'
import { validate_access } from '../controllers/validateController.js'

export const protectedRoutes = Router()

protectedRoutes.post('/validate', verifyJWT, validate_access)