import { tb_user } from "../model/userProfile.js";

const querySet = async (param, item) => {
    try {
        const result = await tb_user.findOne({
            where: { [item]: param }
        })
        if (result) return true
        else return false
    } catch (error) {

    }
}

export const verify = async (req, res, next) => {
    const { email_user } = req.body;

    const val = await querySet(email_user, 'email_user');

    if (val) {
        return res.json('Ya existe email');
    }

    return next();
};