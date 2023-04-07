import { tb_rol_user } from "../model/userProfile.js";

export const registerRol = async (req, res) => {
    const { title_rol_user, description_rol_user } = req.body
    try {
        const result = await tb_rol_user.create({
            title_rol_user,
            description_rol_user
        })

        result && res.json(result)
    } catch (error) {
        res.json(error)
    }
}

export const listRols = async (req, res) => {
    try {
        const rols = await tb_rol_user.findAll();
        res.json(rols);
    } catch (error) {
        res.json(error);
    }
}

export const updateRol = async (req, res) => {
    const { id } = req.params;
    const { title_rol_user, description_rol_user } = req.body;

    try {
        const rolToUpdate = await tb_rol_user.findOne({ where: { pk_id_rol_user: id } });
        if (!rolToUpdate) {
            return res.status(404).json({ message: "Rol no encontrado" });
        }

        rolToUpdate.title_rol_user = title_rol_user;
        rolToUpdate.description_rol_user = description_rol_user;
        await rolToUpdate.save();
        res.json(rolToUpdate);
    } catch (error) {
        res.json(error);
    }
}

export const deleteRol = async (req, res) => {
    const { id } = req.params;
    try {
        const rolToDelete = await tb_rol_user.findOne({ where: { pk_id_rol_user: id } });
        if (!rolToDelete) {
            return res.status(404).json({ message: "Rol no encontrado" });
        }
        await rolToDelete.destroy();
        res.json({ message: "Rol eliminado correctamente" });
    } catch (error) {
        res.json(error);
    }
}