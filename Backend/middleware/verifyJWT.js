import jwt from 'jsonwebtoken'

export const verifyJWT = (req, res, next) => {
    const authHeaders = req.headers.authorization || req.headers.Authorization;
    if (!authHeaders?.startsWith('Bearer')) return res.sendStatus(401);
    const token = authHeaders.split(' ')[1]

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN,
        (err, decoded) => {
            if (err) return res.sendStatus(403)
            req.UserInfo = {
                ...decoded.UserInfo
            }
            res.json("works")

        }
    )
}