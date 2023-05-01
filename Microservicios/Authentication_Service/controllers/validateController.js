import axios from "axios"
import jwt from 'jsonwebtoken'

//Anteriormente se ha validado la informacion con un middleware req.UserInfo
export const validate_access = async (req,res) => {
    const { role, pk_id_user } = req.body

    try {
        const qsRole  = await axios({
            url: 'http://localhost:4001/rol/byField',
            method: 'GET',
            data: {
                field: 'title_rol_user',
                payload: role
            }
        })
    
        const qsUser = await axios({
            url: 'http://localhost:4001/users/byPK',
            method: 'GET',
            data: {
                pk_id_user
            }
        })

        if (qsRole.data.pk_id_rol_user == qsUser.data.fk_id_rol_user) return res.json({match:true})
        else return res.json({match:false})

    } catch (error) {
        res.json(error)
    }
}

//Verificacion con req.body
export const verifyJWT = (req, res) => {
    
    const { token } = req.body

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN,
        (err, decoded) => {
            if (err) {
                return res.json(false).status(403)
            }
            if (decoded?.UserInfo) {
                return res.json({...decoded.UserInfo}).status(200)
            }
        }
    )
}