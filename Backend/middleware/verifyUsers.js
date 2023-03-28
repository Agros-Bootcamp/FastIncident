import { userProfile } from "../model/userProfile.js";

const qs = async (param, item) => {
    try {
        const result = await userProfile.findOne({
            where: { [item] : param }
        })
        if (result) return true
        else return false
    } catch (error) {
        
    }
}

export const verify = async (req, res, next) => {
    const {name, email} = req.body

    const val =  [await qs(name, 'name'), await qs(email, 'email')]

    switch (true) {
        case (val[0] && val[1]) :
            return res.json('Ya existe un usuario con ese email y contraseña')
            break
        case (val[0]) :
            return res.json('Ya existe un usuario con ese nombre')
            break
        case (val[1]) :
            return res.json('Ya existe email')
            break
        default :
            return next()
            break
    }
}