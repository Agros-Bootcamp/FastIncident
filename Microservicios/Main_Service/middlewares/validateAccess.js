import axios from 'axios'

export const validate_admin = async (req, res, next) => {
    
    const authHeaders = req.headers.authorization || req.headers.Authorization;
    if (!authHeaders?.startsWith('Bearer')) return res.sendStatus(401);
    const token = authHeaders.split(' ')[1]

    try {
        const result = await axios({
            method: 'POST',
            url: 'http://localhost:4002/validate/',
            data: {
                token,
                role: 'Administrador'
            }
        })

        result.data.match ? next() : res.json('No tiene acceso')
    } catch (error) {
        res.json(error)
    }

}