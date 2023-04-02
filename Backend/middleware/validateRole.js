import { tb_rol_user, tb_user } from "../model/userProfile.js"

const validate_role = async (pk_id_user, title_rol_user) => {
    try {

        const roles = await tb_rol_user.findAll()

        const user = await tb_user.findOne({
            where: {
                pk_id_user
            }
        })

        const select_rol = roles.filter(rol=>rol.title_rol_user ==title_rol_user)[0]

        const default_rol = roles.filter(rol => rol.title_rol_user == 'integrante')

        const match = user.fk_id_rol_user == select_rol.pk_id_rol_user

        const result = match?select_rol.pk_id_rol_user:default_rol.pk_id_rol_user

        return result

    } catch (error) {
        return undefined
    }
}

export const validate_role_middleware = async (req, res, next) => {
    const { role } =req.params
    const { pk_id_user } =req.UserInfo.payload

    const result = await validate_role(pk_id_user, role)

    req.role = result

    next()

}