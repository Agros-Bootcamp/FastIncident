import axios from 'axios'

const axiosController = async (req, res, port, path, pk) => {
    const {method} = req
    const {body} = req
    const {UserInfo} = req

    const action = req.method !== 'POST' && req.path.split('/')[2]

    const postURL = `${path}`
    const customURL = `${path}/${action}/`
    const customURLwithPK = `${path}/${action}/${pk}`
    const urlDeleteAndPut = `${path}/${pk}`
    
    const fk = path === 'tasks' ? 'fk_id_user' : 'fk_id_task'

    try {
        const result = await axios({
            method,
            baseURL: `http://localhost:${port}/`, 
            url: method === 'POST'? postURL: method === 'DELETE' || method === 'PUT'? urlDeleteAndPut : req.params?.pk ? customURLwithPK : customURL,
            data: {
                ...body,
                [pk] : pk,
                [fk] : method === 'POST' && UserInfo.pk_id_user,
            }
        })
    
        res.json(result.data)
    } catch (error) {
        res.json(error)
    }

}

export const mainController = async (req, res) => {

    const path = req.path.split('/')[1]

    switch (path) {
        case 'tasks':
            const pk_id_task = req.params?.pk
            axiosController(req, res, 4003, path, pk_id_task)
            break
        case 'incidents':
            axiosController(req, res, 4004, path)
            break
        case 'login':

            const credentials = await axios({
                method: 'POST',
                url: 'http://localhost:4002/login/',
                data: {
                    ...req.body
                }
            })

            res.json(credentials.data)

            break

        case 'refresh':
            const newCredentials = await axios({
                method: 'POST',
                url: 'http://localhost:4002/refresh/',
                data: {
                    ...req.body
                }
            })
            res.json(newCredentials.data)
            break
        case 'register':
            const newUser = await axios({
                method: 'POST',
                url: 'http://localhost:4002/register/',
                data: {
                    ...req.body
                }
            })

            res.json(newUser)
            break
        default:
            res.json('No hay operacion disponible')
            break
    }

}