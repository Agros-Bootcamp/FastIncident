import axios from 'axios'

export const mainController = async (req, res) => {

    

    const { method } = req

    const result = await axios({
        method,
        url: `http://localhost:4001/tasks/${method=='GET'&&action}`,
        data: {
            ...body,
            pk_id_incident: req.params?.pk
        }
    })

}