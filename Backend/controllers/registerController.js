import { tb_user } from "../model/userProfile.js";
import bcrypt from 'bcrypt'

export const register = async (req, res) => {
    const { first_name_user, last_name_user, email_user, password_user } = req.body
    const hashedPWD = await bcrypt.hash(password_user, 10)
    try {
        const result = await tb_user.create({
            first_name_user,
            last_name_user,
            email_user,
            password_user: hashedPWD,
            fk_id_rol_user: 'cb9b4acb-971e-4597-81a6-44a638709c7d'
        })

        result && res.json(result)
    } catch (error) {
        res.json(error)
    }
}