import { tb_user, tb_refresh_tokens, tb_rol_user } from '../model/userProfile.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

//querySetUser
const qsUser = async (req, res) => {
    const { email_user } = req.body
    try {
        const user = await tb_user.findOne({
            where: {
                email_user
            }
        })

        const role = await tb_rol_user.findByPk(user.fk_id_rol_user)

        if (user && role) return { ...user.dataValues, title_rol_user: role.title_rol_user }
        else return res.json('No hay un usuario con ese email')
    } catch (error) {
        return null
    }
}

const createJWT = (data) => {
    //Encriptacion de la informacion del usuario en el JWT
    const accessToken = jwt.sign({
        "UserInfo": {
            "first_name_user": data.first_name_user,
            "last_name_user": data.last_name_user,
            "balance_token": data.balance_token,
            "pk_id_user": data.pk_id_user,
            "title_rol_user": data.title_rol_user
        }
    }, process.env.ACCESS_TOKEN,
        { expiresIn: '30m' })

    const refreshToken = jwt.sign(
        { 'pk_id_user': data.pk_id_user },
        process.env.REFRESH_TOKEN,
        { expiresIn: '30m' }
    )

    return {
        accessToken,
        refreshToken
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

        const token = createJWT(user)

        //Almacenamiento de RefreshToken en la base de datos
        await tb_refresh_tokens.create({
            refresh_token: token.refreshToken,
            fk_id_refresh_token: user.pk_id_user
        })

        res.json(token)
        next()
    } else return res.json('No coninciden credenciales')
}

export const refreshToken = async (req, res) => {
    const { refreshToken } = req.body
    try {

        //Verifica si existe el token
        const actualRefreshToken = await tb_refresh_tokens.findOne({
            where: { refresh_token: refreshToken }
        })

        if (!actualRefreshToken) return res.json('No existe Token')
        else {
            //Consulta la informacion del usuario
            const user = await tb_user.findByPk(actualRefreshToken.fk_id_refresh_token)

            //Crea nuevo JWT
            const newJWT = createJWT(user)

            const newRefreshToken = await tb_refresh_tokens.create({
                refresh_token: newJWT.refreshToken,
                fk_id_refresh_token: user.pk_id_user
            })

            //Elimina el Token de refresco de la base de datos para que no sea utilizado
            await tb_refresh_tokens.destroy({
                where: { refresh_token: refreshToken }
            })

            //Entrega los nuevos tokens
            res.json(newJWT)
        }

    } catch (error) {
        res.json(error.message)
    }

}

