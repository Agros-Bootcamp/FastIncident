import axios from 'axios'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setTokens, logOut } from '../api/authSlice'
import { fetchUpdateTokens } from '../api/main/apiSlice'

export const useAxiosCustomHook = async (baseUrl, url, method, data) => {

    const dispatch = useDispatch()

    const accessToken = useSelector(state=>state.auth.accessToken)
    const refreshToken = useSelector(state=>state.auth.refreshToken)

    let result = await axios({
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            baseURL: baseUrl,
            url: url,
            method: method,
            data
        })

    if (result?.error?.originalStatus === 403 || result?.data?.status_code === 403) {

        //Realiza una peticion POST a traves de la funcion anteriormente creada para el refresco de los tokens
        const refreshResult = await fetchUpdateTokens({
            refreshToken: refreshToken
        })

        console.log(refreshResult)

        //En caso exista una respuesta y exista la data ejecute lo siguiente
        if(refreshResult?.data) {

            //Establece los nuevos tokens a partir del reducer setTokens
            dispatch(setTokens(refreshResult.data))

            return result

        } else {
            //En caso no se obtenga una respuesta, se procedera a eliminar los tokens y la cookie con el reducer logOut
            dispatch(logOut())
        
            return result
        }
    }

    return result
}