import { Op } from "sequelize";
import moment from "moment";
import { tb_user } from "../model/userProfile.js";

// Controlador para obtener los usuarios con más de 5 días de inactividad
export const getInactiveUsers = async (req, res) => {
    const inactiveUsers = await tb_user.findAll({
        where: {
            last_date_login: {
                [Op.lt]: moment().subtract(5, 'days').toDate()
            }
        }
    });

    if (inactiveUsers.length > 0) {
        res.json(inactiveUsers);
    } else {
        res.json({ message: "No se encontraron usuarios inactivos." });
    }
};


