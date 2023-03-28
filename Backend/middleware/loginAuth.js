export const verify = async (req, res, next) => {
    const {email, password} = req.body
    !email?
    res.json('Ingrese email'):
        !password?
        res.json({message:'Ingrese contraseña'}):
            !email && !password ?
            res.json({message: 'No ha ingresado credenciales'}):
                next()
}