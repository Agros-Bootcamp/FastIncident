import { tb_rol_user, tb_user } from "../model/userProfile.js"

const qs_role = async (pk_id_user, title_rol_user, res) => {
    try {

        const { pk_id_rol_user } = await tb_rol_user.findOne({
            where: {
                title_rol_user
            }
        })

        const { fk_id_rol_user } = await tb_user.findOne({
            where: {
                pk_id_user
            }
        })

        if (pk_id_rol_user !== fk_id_rol_user) return pk_id_rol_user

        else return null

    } catch (error) {
        return res.json('Ocurrio un error')
    }
}

export const validate_access = async (req, res, next) => {
    const { pk_id_user } = req.UserInfo
    const role = req.path.slice(1)
    const result = await qs_role(pk_id_user,role, res)
    if (!result) return res.json('No tiene permisos para acceder a esta funcion')
    else {
        req.role = result
        next()
    }
}