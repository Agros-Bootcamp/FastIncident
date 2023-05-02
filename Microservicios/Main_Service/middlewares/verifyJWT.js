import axios from "axios";

export const verifyJWT = async (req, res, next) => {
    
    const authHeaders = req.headers.authorization || req.headers.Authorization;
    if (!authHeaders?.startsWith('Bearer')) return res.sendStatus(401);
    const token = authHeaders.split(' ')[1]

    try {
        const result = await axios({
            method: 'POST',
            url: 'http://localhost:4002/validateJWT/',
            data: {
                token
            }
        })

        if (result.data) {
            req.body.pk_id_user = result.data.pk_id_user
            return next()
        } else {
            return res.status(403).json('Credenciales expiradas')
        }

    } catch (error) {
        res.json(error)
    }
}