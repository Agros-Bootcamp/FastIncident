import axios from 'axios'

export const mainController = async (req, res) => {
    const {method} = req
    const {body, path} = req
    const action = path.split('/')[2]

    const result = await axios({
        method,
        url: `http://localhost:4001/tasks/${method=='GET'&&action}`,
        data: {
            ...body,
            pk_id_incident: req.params?.pk
        }
    })

    res.json(result.data)
}