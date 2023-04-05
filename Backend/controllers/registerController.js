import { tb_user, tb_rol_user } from "../model/userProfile.js";
import bcrypt from 'bcrypt'

const member_role = async (name) => {
    try {
        const result = await tb_rol_user.findOne({
            where: {
                title_rol_user: name
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
    try {
        const result = await tb_user.create({
            ...req.body,
            password_user: hashedPWD,
            fk_id_rol_user: member_role('integrante')
        })

        result && res.json(result)
    } catch (error) {
        res.json(error)
    }
}

export const register_by_role = async (req, res) => {
    const {password_user} = req.body
    const {role} =req.params

    try {
        const hashedPWD = await bcrypt.hash(password_user, 10)

        const result = await tb_user.create({
            ...req.body,
            password_user:hashedPWD,
            fk_id_rol_user: member_role(role)
        })

        result && res.json(result) 
    } catch (error) {
        res.json(error.message)
    }
}