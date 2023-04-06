import { tb_user } from '../model/userProfile.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

//Modificar el nombre
const qsUser = async (req, res) => {
    const { email_user } = req.body
    try {
        const user = await tb_user.findOne({
            where: {
                email_user
            }
        })

        if (user) return user
        else return res.json('No hay un usuario con ese email')
    } catch (error) {
        return null
    }
}

export const authTokens = async (req, res, next) => {
    const { password_user } = req.body
    //Validacion de email de usuario
    const user = await qsUser(req, res)
    if (!user) return res.json('no hay')

    //Validacion de contraseña
    const match = await bcrypt.compare(password_user, user.password_user)
    if (match) {
        const accessToken = jwt.sign({
            "UserInfo": {
                "first_name_user": user.first_name_user,
                "last_name_user": user.last_name_user,
                "balance_token": user.balance_token,
                "pk_id_user": user.pk_id_user
            }
        }, process.env.ACCESS_TOKEN,
            { expiresIn: '30m' })

        const refreshToken = jwt.sign(
            { 'username': user.first_name_user },
            process.env.REFRESH_TOKEN,
            { expiresIn: '30m' }
        )

        res.json({
            accessToken,
            refreshToken
        })
        next()
    } else return res.json('No coninciden credenciales')
}

export const refreshToken = async (req, res) => {
    const token = req.headers.authorization || Authorization

    try {

    } catch (error) {

    }
}
