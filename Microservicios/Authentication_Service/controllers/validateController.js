import axios from "axios"

//Anteriormente se ha validado la informacion con un middleware req.UserInfo
export const validate_access = async (req,res) => {
    const { role } = req.body
    const { pk_id_user } = req.UserInfo

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