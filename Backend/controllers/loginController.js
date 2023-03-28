import {userProfile} from '../model/userProfile.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const qsUser = async (req, res) => {
    const {email} = req.body
    const user = await userProfile.findOne({
        where: {
            email
        }
    })

    return user
}

export const authTokens = async (req, res) => {
    const {password} = req.body

    const user = await qsUser(req, res)
    if (!user) return res.json('no hay')
    
    const match = await bcrypt.compare(password, user.password)

    if (match) {
        const accessToken = jwt.sign({
            "UserInfo" : {
                "username" : user.name
            }
        }, process.env.ACCESS_TOKEN, 
        { expiresIn: '15s' })
        const refreshToken = jwt.sign(
            {'username':user.name},
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