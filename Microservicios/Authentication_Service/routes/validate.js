import {Router} from 'express'
import { verifyRefreshJWT } from '../Middleware/verifyJWT.js'
import { validate_access, verifyJWT } from '../controllers/validateController.js'
import { refreshTokenController } from '../controllers/loginController.js'

export const protectedRoutes = Router()

protectedRoutes.post('/validate', validate_access)
               .post('/refresh', verifyRefreshJWT, refreshTokenController)
               .post('/validateJWT', verifyJWT)

//Ruta Validate:
//Recibe un objeto en el req.body que contiene el token a ser validado y el rol que necesita la ruta para compararlo

//req.body : {
//  role: 'Administrador',
//  token: 'Token de acceso JWT'    
// }

//El VerifyJWT verifica la validez del token, en caso de ser cierto guarda la informacion en una nueva instancia del objeto request como
//req.UserInfo

//El controlador validate_access toma el role enviado en el req.body, y de la informacion decodificada el pk_id_user para comparar si el rol enviado para validar coincide con el rol que posee el usuario en la base de datos, de ser cierto envia un objeto

// {match:true} sino {match:false}

//Ruta Refresh:
//Recibe un objeto en el req.body de la siguiente manera:

//req.body : {
//  refresthToken: 'token'
// }

//El VerifyRefreshJWT verifica la validez del token, en caso de ser cierto guarda la informacion en una nueva instancia del objeto request como
//req.UserInfo

//El controlador toma la informacion y ejecuta las funciones para verificar si el token es valido en la base de datos, para asi enviar nuevos tokens de acceso de la siguiente manera:

// { accessToken: 'Token', refreshToken: 'RefreshToken' }