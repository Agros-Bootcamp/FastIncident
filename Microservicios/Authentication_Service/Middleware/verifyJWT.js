import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import axios from 'axios'

config()

//Verificacion con req.body
export const verifyRefreshJWT = (req, res, next) => {

    const { refreshToken } = req.body

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN,
        (err, decoded) => {
            if (err) return res.json('No hay acceso').status(403)
            else {
                req.UserInfo = {
                ...decoded
                }
                return next()
            }
        }
    )
}

//Verificacion con headers
export const internalVerifyJWT = (req, res, next) => {
    
    const authHeaders = req.headers.authorization || req.headers.Authorization;
    if (!authHeaders?.startsWith('Bearer')) return res.sendStatus(401);
    const token = authHeaders.split(' ')[1]

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN,
        (err, decoded) => {
            if (err) return res.json(false).status(403)
            req.UserInfo = {
                ...decoded.UserInfo
            }
            return next()
        }
    )
}

//Middleware anterior valida la informacion del token
//En caso de ser valido, toma su informacion y valida si tiene acceso segun su rol
export const validate_admin = async (req,res, next) => {

    const { pk_id_user } = req.UserInfo

    try {
        const qsRole  = await axios({
            url: 'http://localhost:4001/rol/byField',
            method: 'GET',
            data: {
                field: 'title_rol_user',
                payload: process.env.NAME_ADMIN
            }
        })
    
        const qsUser = await axios({
            url: 'http://localhost:4001/users/byPK',
            method: 'GET',
            data: {
                pk_id_user
            }
        })

        if (qsRole.data.pk_id_rol_user == qsUser.data.fk_id_rol_user) return next()
        else return res.json('No tiene acceso')

    } catch (error) {
        res.json(error)
    }
}