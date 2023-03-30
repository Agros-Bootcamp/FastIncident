import { tb_task } from "../model/userProfile";

export const create_task = async (req, res) => {
    try {
        const result = await tb_task.create({...req.body})

        result && res.json(result)
    } catch (error) {
        res.json(error)
    }
}

export const read_own_tasks = async (req, res) => {
    
    const {pk_id_user} = req

    try {
        const result = await tb_task.findAll({
            where: {
                fk_id_user : pk_id_user
            }
        })

        result && res.json(result)
    } catch (error) {
        res.json(error)
    }
}

export const update_tasks = async (req, res) => {

    const { field, payload } = req.body

    try {
        const result = await tb_task.update({ [field] : payload}, {
            where: {
                pk_id_task
            }
        })

        result && res.json(result)
    } catch (error) {
        res.json(error)
    } 
}

export const delete_tasks = async (req, res) => {
    
    const pk_id_task = req.params
    
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