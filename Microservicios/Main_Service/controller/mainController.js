import axios from 'axios'

// const axiosController = async (req, res, port, path, pk) => {
//     const {method} = req
//     const {body} = req
//     const {UserInfo} = req

//     const action = req.method !== 'POST' && req.path.split('/')[2]

//     const postURL = `${path}`
//     const customURL = `${path}/${action}/`
//     const customURLwithPK = `${path}/${action}/${pk}`
//     const urlDeleteAndPut = `${path}/${pk}`
    
//     const fk = path === 'tasks' ? 'fk_id_user' : 'fk_id_task'

//     try {
//         const result = await axios({
//             method,
//             baseURL: `http://localhost:${port}/`, 
//             url: method === 'POST'? postURL: method === 'DELETE' || method === 'PUT'? urlDeleteAndPut : req.params?.pk ? customURLwithPK : customURL,
//             data: {
//                 ...body,
//                 [pk] : pk,
//                 [fk] : method === 'POST' && UserInfo.pk_id_user,
//             }
//         })
    
//         res.json(result.data)
//     } catch (error) {
//         res.json(error)
//     }

// }

export const axiosController = async (req, res, element, port) => {

    const {method, body} = req

    const instance = axios.create({
        baseURL: `http://localhost:${port}/${element}/`
    })

    const pk_field = element === 'tasks' ? 'pk_id_task' : element === 'incidents' && 'pk_id_incident'

    try {
        switch (method) {
            case 'POST':
    
                const postResult = await instance({
                    method: 'POST',
                    data: {
                        ...body,
                        fk_id_user: element === 'tasks' && req.body.pk_id_user
                    }
                })

                console.log(body)

                res.json(postResult.data)
    
                break
            case 'PUT':
    
                const putResult = await instance({
                    method: 'PUT',
                    url: `${req.params?.pk}`,
                    data: {
                        ...body
                    }
                })
    
                res.json(putResult.data)
    
                break
            case 'DELETE':
    
                const deleteResult = await instance({
                    method: 'DELETE',
                    url: `${req.params?.pk}`
                })
    
                res.json(deleteResult)
    
                break
            case 'GET':
            
                const arrayPath = req.path.split('/')
                const subPath = arrayPath[2]

                if (subPath === 'allByFk') {
                    const url = `${subPath}/${arrayPath[3]}/${req.params?.payload}`

                    const result = await instance({
                        method: 'GET',
                        url
                    })

                    res.json(result.data)
                } else if ( subPath === 'byPK') {
                    const url = `${subPath}/${req.params?.pk}`

                    const result = await instance({
                        method: 'GET',
                        url
                    })

                    res.json(result.data)
                } else if (subPath === 'all') {

                    const result = await instance({
                        method: 'GET',
                        url: 'all/'
                    })

                    res.json(result.data)
                }

                break
            default:
                res.json('No hay metodo disponible').status(404)
                break
        }
    } catch (error) {
        res.json(error)
    }

}

export const mainController = async (req, res) => {

    const path = req.path.split('/')[1]

    switch (path) {
        case 'tasks':
            const tasksElement = 'tasks'
            axiosController(req, res, tasksElement, 4003)
            break
        case 'incidents':
            const incidentsElement = 'incidents'
            axiosController(req, res, incidentsElement, 4004)
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
                    refreshToken: req.body.refreshToken
                }
            })
            
            if (newCredentials.data) {
                res.json(newCredentials.data)
            } else {
                res.sendStatus(403)
            }

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