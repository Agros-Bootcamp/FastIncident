import { tb_task } from "../model/userProfile.js";

export const createTask = async (req, res) => {
    const { pk_id_user } = req.UserInfo
    try {
        const result = await tb_task.create({
            ...req.body,
            fk_id_user: pk_id_user
        })

        result && res.json(result)
    } catch (error) {
        res.json(error)
    }
}

export const readOwnTasks = async (req, res) => {

    const { pk_id_user } = req.params

    try {
        const result = await tb_task.findAll({
            where: {
                fk_id_user: pk_id_user
            }
        })

        result && res.json(result)
    } catch (error) {
        res.json(error)
    }
}

export const updateTask = async (req, res) => {

    const { pk_id_task } = req.params

    const { field, payload } = req.body

    try {
        const result = await tb_task.update({ [field]: payload }, {
            where: {
                pk_id_task
            }
        })

        result && res.json(result)
    } catch (error) {
        res.json(error)
    }
}

export const deleteTask = async (req, res) => {

    const { pk_id_task } = req.params

    try {
        const result = await tb_task.destroy({
            where: {
                pk_id_task
            }
        })

        result && res.json(result)
    } catch (error) {
        res.json(error)
    }
}