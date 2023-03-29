import { tb_user } from "../model/userProfile.js";
import bcrypt from 'bcrypt'

export const register = async (req, res) => {
    console.log('try3')
    const { first_name_user, last_name_user, email_user, password_user, fk_id_rol_user } = req.body
    const hashedPWD = await bcrypt.hash(password_user, 10)
    try {
        const result = await tb_user.create({
            first_name_user,
            last_name_user,
            email_user,
            password_user: hashedPWD,
            fk_id_rol_user
        })

        result && res.json(result)
    } catch (error) {
        res.json(error)
    }
}