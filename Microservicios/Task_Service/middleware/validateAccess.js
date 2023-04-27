import axios from 'axios'

export const validate_access = async (req, res, next) => {
    const authHeaders = req.headers.authorization || req.headers.Authorization
    
    if (!authHeaders?.startsWith('Bearer')) return res.sendStatus(401);
    const token = authHeaders.split(' ')[1]

    const role = req.path.split('/')[0]

    const decodedData = await axios({
        url: 'http://localhost:4001/validate',
        data: {
            token,
            role
        }
    })


}