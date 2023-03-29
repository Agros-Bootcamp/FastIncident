import { tb_user } from '../model/userProfile.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const qsUser = async (req, res) => {
    const { email_user } = req.body
    const user = await tb_user.findOne({
        where: {
            email_user
        }
    })

    return user
}

export const authTokens = async (req, res) => {
    const { password_user } = req.body

    const user = await qsUser(req, res)
    if (!user) return res.json('no hay')

    const match = await bcrypt.compare(password_user, user.password)

    if (match) {
        const accessToken = jwt.sign({
            "UserInfo": {
                "username": user.first_name_user
            }
        }, process.env.ACCESS_TOKEN,
            { expiresIn: '15s' })
        const refreshToken = jwt.sign(
            { 'username': user.first_name_user },
            process.env.REFRESH_TOKEN,
            { expiresIn: '30m' }
        )
        res.json({
            accessToken,
            refreshToken
        })
    }
    // const match = await bcrypt.compare(password, user.password)
    // if (match) {
    //     const accessToken = jwt.sign({
    //         "UserInfo" : {
    //             "username": user.name,
    //         }
    //     })

    // }
}