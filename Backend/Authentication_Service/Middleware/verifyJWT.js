import jwt from 'jsonwebtoken'

export const verifyJWT = (req, res, next) => {
    
    const { token } = req.body

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN,
        (err, decoded) => {
            if (err) return res.sendStatus(403)
            req.UserInfo = {
                ...decoded.UserInfo
            }
            next()
        }
    )
}

export const verifyRefreshJWT = (req, res, next) => {
    const { refreshToken } = req.body
    jwt.verify(refreshToken,
        process.env.REFRESH_TOKEN,
        (err, decoded) => {
            if (err) return res.sendStatus(403)
            next()
        }
    )
}