import { tb_user, tb_rol_user } from "../model/userProfile.js";
import bcrypt from 'bcrypt'

//Función que devuelve el pk_id_rol_user, para asi poder identificar el rol
const searchMemberRole = async (title_rol_user, res) => {
    try {
        const result = await tb_rol_user.findOne({
            where: {
                title_rol_user
            }
        })
        return result.pk_id_rol_user
    } catch (error) {
        res.json(error.message)
    }
}

export const registerUser = async (req, res) => {
    const { first_name_user, last_name_user, email_user, password_user } = req.body
    const hashedPWD = await bcrypt.hash(password_user, 10)
    const fk_id_rol_user = await searchMemberRole('Integrante', res)
    try {
        const result = await tb_user.create({
            first_name_user,
            last_name_user,
            email_user,
            password_user: hashedPWD,
            fk_id_rol_user
        })

        result && res.json(result)
    } catch (error) {
        res.json(error)
    }
}

//Función para registrar administradores validando su rol
//Revisar
export const registerUserByRole = async (req, res) => {
    const { password_user } = req.body
    const { role } = req.params
    const fk_id_rol_user = await searchMemberRole(role, res)
    try {
        const hashedPWD = await bcrypt.hash(password_user, 10)

        const result = await tb_user.create({
            ...req.body,
            password_user: hashedPWD,
            fk_id_rol_user
        })

        result && res.json(result)
    } catch (error) {
        res.json(error.message)
    }
}

export const listUsers = async (req, res) => {
    try {
        const users = await tb_user.findAll();
        res.json(users);
    } catch (error) {
        res.json(error);
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { first_name_user, last_name_user, email_user, password_user } = req.body;
    const hashedPWD = password_user ? await bcrypt.hash(password_user, 10) : undefined;

    // Crear objeto con los campos que se quieren actualizar
    const updatedFields = {};
    if (first_name_user) updatedFields.first_name_user = first_name_user;
    if (last_name_user) updatedFields.last_name_user = last_name_user;
    if (email_user) updatedFields.email_user = email_user;
    if (hashedPWD) updatedFields.password_user = hashedPWD;
    try {
        const [updatedRows] = await tb_user.update(updatedFields, { where: { pk_id_user: id } });

        if (updatedRows === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json({ message: "Usuario actualizado exitosamente" });
    } catch (error) {
        res.json(error);
    }
};


export const deleteUser = async (req, res) => {
    const { id } = req.params; // Obtiene el id del usuario a eliminar desde los parámetros de la solicitud

    try {
        // Busca el usuario a eliminar en la base de datos
        const userToDelete = await tb_user.findOne({ where: { pk_id_user: id } });

        // Si el usuario no existe, devuelve un error
        if (!userToDelete) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Elimina el usuario de la base de datos
        await userToDelete.destroy();

        // Devuelve un mensaje de éxito
        res.json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        res.json(error);
    }
};