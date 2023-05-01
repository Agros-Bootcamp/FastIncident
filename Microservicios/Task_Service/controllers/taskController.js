import axios from 'axios'

export const mainController = async (req, res) => {
    const {method} = req
    const {body, path} = req
    const action = path.split('/')[2]

    try {
        const result = await axios({
            method,
            url: `http://localhost:4001/tasks/${method=='GET'&&action}`,
            data: {
                ...body,
                pk_id_task: req.params?.pk,
                field: action === 'allByFk' && 'fk_id_user',
                payload: action === 'allByFk' && req.body.fk_id_user
            }
        })
    
        res.json(result.data)
    } catch (error) {
        res.json(error)
    }
}