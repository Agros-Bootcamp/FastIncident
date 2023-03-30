import jwt from 'jsonwebtoken'

export const verifyJWT = (req, res, next) => {
    const authHeaders = req.headers.authorization || req.headers.Authorization;
    if (!authHeaders?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeaders.split('')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN,
        (err, decoded) => {
            if (err) return res.sendStatus(403)
            req.first_name_user = decoded.UserInfo.first_name_user
            req.last_name_user=decoded.UserInfo.last_name_user
            req.balance_token=decoded.UserInfo.balance_token
            req.pk_id_user=decoded.UserInfo.pk_id_user
            next()
        }
    )
}