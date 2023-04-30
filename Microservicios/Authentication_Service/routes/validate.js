import {Router} from 'express'
import { verifyJWT, verifyRefreshJWT } from '../Middleware/verifyJWT.js'
import { validate_access } from '../controllers/validateController.js'
import { refreshTokenController } from '../controllers/loginController.js'

export const protectedRoutes = Router()

protectedRoutes.post('/validate', verifyJWT, validate_access)
               .post('/refresh', verifyRefreshJWT, refreshTokenController)