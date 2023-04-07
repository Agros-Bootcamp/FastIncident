import { tb_rol_user, tb_user } from "../model/userProfile.js"

const querySetRole = async (pk_id_user, title_rol_user, res) => {
    try {

        const result1 = await tb_rol_user.findOne({
            where: {
                title_rol_user
            }
        })

        const result2 = await tb_user.findOne({
            where: {
                pk_id_user
            }
        })

        if (result1.pk_id_rol_user == result2.fk_id_rol_user) return result1.pk_id_rol_user

        else return null

    } catch (error) {
        return res.json(error.message)
    }
}

//Revisar función
export const validate_access = async (req, res, next) => {
    const { pk_id_user } = req.UserInfo
    const role = req.path.split('/')[2]
    const result = await querySetRole(pk_id_user, role, res)
    if (!result) return res.json('No tiene permisos para acceder a esta funcion')
    else {
        req.role = result
        next()
    }
}