import axios from "axios";
import bcrypt from 'bcrypt'

export const registerUser = async (req, res) => {
    const { first_name_user, last_name_user, email_user, password_user, title_rol_user } = req.body

    try {
        const hashedPWD = await bcrypt.hash(password_user, 10)

        const role = await axios({
            method: 'GET',
            url: 'http://localhost:4001/rol/byField',
            data: {
                field: 'title_rol_user',
                payload: title_rol_user
            }
        })

        const newUser = await axios({
            method: 'POST',
            url: 'http://localhost:4001/users/default',
            data: {
                first_name_user,
                last_name_user,
                email_user,
                password_user: hashedPWD,
                fk_id_rol_user: role.data.pk_id_rol_user
            }
        })

        newUser && res.json(newUser.data)

    } catch (error) {
        
        res.json(error)

    }
}