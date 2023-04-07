import { tb_user, tb_rol_user } from "../model/userProfile.js";
import bcrypt from 'bcrypt'

const search_member_role = async (title_rol_user, res) => {
    try {
        const result = await tb_rol_user.findOne({
            where: {
                title_rol_user
            }
        })
        return result.pk_id_rol_user
    } catch (error) {
        res.json(error.message)
    }
} 

export const register = async (req, res) => {
    const { password_user } = req.body

    const hashedPWD = await bcrypt.hash(password_user, 10)
    const fk_id_rol_user = await search_member_role('administrador', res)
    
    try {
        const result = await tb_user.create({
            ...req.body,
            password_user: hashedPWD,
            fk_id_rol_user
        })

        result && res.json(result)
    } catch (error) {
        res.json(error.message)
    }
}

export const register_by_role = async (req, res) => {
    const {password_user} = req.body
    const {role} =req.params


    const fk_id_rol_user = await search_member_role(role, res)
    
    try {
        const hashedPWD = await bcrypt.hash(password_user, 10)

        const result = await tb_user.create({
            ...req.body,
            password_user:hashedPWD,
            fk_id_rol_user
        })

        result && res.json(result) 
    } catch (error) {
        res.json(error.message)
    }
}