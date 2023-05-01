import axios from 'axios'

export const mainController = async (req, res) => {
    const {method} = req
    const {body, path} = req
    const action = path.split('/')[2]

    try {
        const result = await axios({
            method,
            url: `http://localhost:4001/incidents/${method=='GET'&&action}`,
            data: {
                ...body,
                pk_id_incident: req.params?.pk,
                field: action === 'allByFk' && 'fk_id_task',
                payload: action === 'allByFk' && req.body.fk_id_task
            }
        })
    
        res.json(result.data)
    } catch (error) {
        res.json(error)
    }
}