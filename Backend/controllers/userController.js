import { tb_user } from "../model/userProfile.js";
export const listUsers = async (req, res) => {
    try {
        const users = await tb_user.findAll();
        res.json(users);
    } catch (error) {
        res.json(error);
    }
};
