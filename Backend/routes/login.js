import { Router } from "express";
import { verify } from '../middleware/loginAuth.js'
import { authTokens } from '../controllers/loginController.js'
import { verifyJWT } from "../middleware/verifyJWT.js";
import { tb_rol_user, tb_user } from "../model/userProfile.js";

export const routerLogin = Router()
export const routerJWT = Router()

routerLogin.post('/login', authTokens)
routerJWT.post('/jwt',verifyJWT,async (req, res) => {
    const result = await tb_rol_user.findOne({
        where: {
            pk_id_rol_user: "cb9b4acb-971e-4597-81a6-44a638709c7d"
        }
    })
    
    res.json(result)
})