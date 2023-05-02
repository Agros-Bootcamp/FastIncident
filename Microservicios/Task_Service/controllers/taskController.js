import axios from 'axios'

// export const mainController = async (req, res) => {
//     const {method} = req
//     const {body, path} = req
//     const action = path.split('/')[2]

//     try {
//         const result = await axios({
//             method,
//             url: `http://localhost:4001/tasks/${method=='GET'&&action}`,
//             data: {
//                 ...body,
//                 pk_id_task: req.params?.pk,
//                 field: action === 'allByFk' && 'fk_id_user',
//                 payload: action === 'allByFk' && req.body.fk_id_user
//             }
//         })
    
//         res.json(result.data)
//     } catch (error) {
//         res.json(error)
//     }
// }

export const mainController = async (req, res) => {

    const {method, body} = req

    const instance = axios.create({
        baseURL: 'http://localhost:4001/tasks/'
    })

    try {
        switch (method) {
            case 'POST':
    
                const postResult = await instance({
                    method: 'POST',
                    url:'default',
                    data: {
                        ...body
                    }
                })
    
                res.json(postResult.data)
    
                break
            case 'PUT':
    
                const putResult = await instance({
                    method: 'PUT',
                    url:'default',
                    data: {
                        ...body,
                        pk_id_task: req.params?.pk
                    }
                })
    
                res.json(putResult.data)
    
                break
            case 'DELETE':
    
                const deleteResult = await instance({
                    method: 'DELETE',
                    url:'default',
                    data: {
                        pk_id_task: req.params?.pk
                    }
                })
    
                res.json(deleteResult)
    
                break
            case 'GET':
                
                const {path} = req
    
                const subPath = path.split('/')[2]
    
                // const getResult = await instance({
                //     method: 'GET',
                //     url: `${subPath}/${subPath}/`,
                //     data: {
                //         pk_id_task: req.params?.pk,
                //         field: req.params?.field,
                //         payload: req.params?.payload
                //     }
                // })
    
                if (subPath == 'all') {
                    const result = await instance({
                        method: 'GET',
                        url: 'all/'
                    })

                    res.json(result.data)
                } else if (subPath == 'allByFk') {

                    const result = await instance({
                        method: 'GET',
                        url: `allByFk/`,
                        data: {
                            field: req.params?.field,
                            payload: req.params?.payload
                        }
                    })

                    res.json(result.data)
                } else if (subPath === 'byPK') {
                    
                    const result = await instance({
                        method: 'GET',
                        url: `byPK/`,
                        data: {
                            pk_id_task: req.params.pk
                        }
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