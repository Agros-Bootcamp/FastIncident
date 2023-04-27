import axios from 'axios'

export const createTask = async (req, res) => {
    const { pk_id_user } = req.body

    const result2 = await axios.post('http://localhost:4001/task/default', {...req.body, fk_id_user: pk_id_user})

    const result = await axios({
        url: 'http://localhost:4001/users/default',
        method: 'POST',
        data: {
            ...req.body,
            fk_id_user: pk_id_user
        }
    })

    result && res.json(result.data)
}