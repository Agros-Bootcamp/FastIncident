import axios from 'axios'

export const qsTypeIncident = async (req, res, next) => {
    const { title_type_incident } = req.body

    try {
        const result = await axios({
            method: 'GET',
            url: 'http://localhost:4001/typeIncident/byField/',
            data: {
                field: 'title_type_incident',
                payload: title_type_incident
            }
        })
    
        req.body.fk_id_type_incident = result.data.pk_id_type_incident

        result.data && next()
        
    } catch (error) {
        res.json(error)    
    }

}