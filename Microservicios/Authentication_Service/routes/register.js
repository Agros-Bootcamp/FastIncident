import { Router } from "express";
import { registerUser } from "../controllers/registerController.js";
import { internalVerifyJWT, validate_admin } from "../Middleware/verifyJWT.js";

export const registerRoute = Router()

registerRoute.post('/register', internalVerifyJWT, validate_admin, registerUser)

//Ruta de registro para usuarios solo valida para los administradores

//Para hacer peticion a esta ruta se deben establecer headers

//req.headers : { authorization || Authorization : Bearer Token }

//Y enviar un req.body con la informacion del usuario a registrar

//req.body : { email_user, password_user, first_name_user, last_name_user, title_rol_user }

//Al decodificarse la informacion en caso de ser valido el token, se compara en la base de datos con el middleware Validate_admin (Solo acepta el nombre de administrador colocado en las variables de entorno)

//Si tiene acceso ejecuta la operacion para registrar al usuario en la base de datos