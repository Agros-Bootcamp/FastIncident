import { userProfile } from "../model/userProfile.js";
import bcrypt from 'bcrypt'

export const register = async (req, res) => {
    console.log('try3')
    const {name, email, password} = req.body
    const hashedPWD = await bcrypt.hash(password, 10)
    try {
        const result = await userProfile.create({
            name,
            email,
            password: hashedPWD
        })

        result && res.json(result)
    } catch (error) {
        res.json('error')
    }
}