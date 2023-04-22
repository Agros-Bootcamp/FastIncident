import axios from "axios";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const qsUser = async (req, res) => {
    const { email_user } = req.body
    try {
        const user = await axios({
            method: 'GET',
            url: 'http://localhost:4001/users/byField',
            data: {
                field: 'email_user',
                payload: email_user
            }
        })

        const role = await axios({
            method: 'GET',
            url: 'http://localhost:4001/rol/byField',
            data: {
                field: 'pk_id_rol_user',
                payload: user.data.fk_id_rol_user
            }
        })

        if (user.data && role.data) return {
            ...user.data,
            title_rol_user: role.data.title_rol_user
        }
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
        { expiresIn: '10s' })

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

export const authTokens = async (req, res) => {
    
    const { password_user } = req.body

    //Validacion de email de usuario

    const user = await qsUser(req, res)
    if (!user) return res.json('no hay')

    //Validacion de contraseña

    const match = await bcrypt.compare(password_user, user.password_user)


    if (match) {

        const token = createJWT(user)

        //Almacenamiento de RefreshToken en la base de datos
        
        await axios({
            method: 'POST',
            url: 'http://localhost:4001/refresh/',
            data: {
                fk_id_refresh_token: user.pk_id_user,
                refresh_token: token.refreshToken
            }
        })

        //aqui puedo agregar la función para que actualicé la fecha de ultimo inicio de sesión
        // Actualiza el campo last_date_login con la fecha actual

        await axios({
            method: 'PUT',
            url: 'http://localhost:4001/users/default',
            data: {
                pk_id_user: user.pk_id_user,
                last_date_login: new Date()
            }
        })

        res.json(token)
    } else return res.json('No coninciden credenciales')
}