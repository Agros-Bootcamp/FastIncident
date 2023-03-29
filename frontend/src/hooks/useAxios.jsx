import { useReducer } from "react"

export const useAxios = (config) => {
    const {
        axiosInstance,
        method,
        url,
        requestConfig = {}
    } = config

    const [data, setData] = useReducer((state, action)=>{
        const item = {...state, [action.field]:action.payload}
        state = item
    }, {
        response:[],
        error:'',
        loading: true,
    })

    const fetchAPI = async () => {
        try {
            const res = await axiosInstance[method.toLowerCase()](url, {
                ...requestConfig
            })

            setData({
                field: 'response',
                payload: res.data
            })

        } catch (err) {
            setData({
                field: 'error',
                payload: err.message
            })
        } finally {
            setData({
                field: 'loading',
                payload: false
            })
        }
    }

    fetchAPI()

    return [data, fetchAPI]

}