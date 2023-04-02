export const verify = async (req, res, next) => {
    const {email_user, password_user} = req.body
    !email_user?
    res.json('Ingrese email'):
        !password_user?
        res.json({message:'Ingrese contraseña'}):
            !email_user && !password_user ?
            res.json({message: 'No ha ingresado credenciales'}):
                next()
}