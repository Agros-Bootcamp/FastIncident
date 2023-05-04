import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/dist/query/react";
import axios from 'axios'

import { setTokens, logOut } from "../authSlice";


//Con la libreria de AXIOS creamos una funcion para realizar peticion POST al endpoint que regenera los tokens de autentificacion
export const fetchUpdateTokens = async (token) => {
    try {
        const response = await axios.post('http://localhost:4007/refresh/', token)
        if(response) return response
    } catch (error) {
        console.log(error)
    }
}


//Creamos una plantilla base para las peticiones hacia el servidor
const baseQuery = fetchBaseQuery({
    //Usamos prepareHeaders para que los headers de las peticiones puedan ser modificados dinamicamente segun existan los tokens de acceso
    prepareHeaders: (headers, { getState }) => {
        //Con getState solicitamos el estado del token de acceso
        const {accessToken} = getState().auth
        if (accessToken!==undefined) {
            //En caso exista se establece en los headers como "Bearer (token)"
            headers.set('authorization', `Bearer ${accessToken}`)
        }
        //En caso no exista retornara unos headers vacios
        return headers
    }
})


//Este BaseQuery es un middleware que toma los argumentos de la peticion hacia el servidor
const baseQueryWithReauth = async (args, api, extraOptions) => {

    //Ejecuta la peticion a partir de la plantilla base
    let result = await baseQuery(args, api, extraOptions)

    //En caso exista el error de prohibicion, entonces el token de acceso caduco
    if ( result?.error?.originalStatus === 403 || result.error?.status === 403 ){

        //Solicitamos de nuestros estados la informacion del token de refresco
        const {refreshToken} = api.getState().auth
        console.log(refreshToken)

        //Realiza una peticion POST a traves de la funcion anteriormente creada para el refresco de los tokens
        const refreshResult = await fetchUpdateTokens({
            refreshToken: refreshToken
        })

        console.log(refreshResult)

        //En caso exista una respuesta y exista la data ejecute lo siguiente
        if(refreshResult?.data) {

            //Establece los nuevos tokens a partir del reducer setTokens
            api.dispatch(setTokens(refreshResult.data))

            //Realiza otra vez la peticion que tenia el error 403
            result = await baseQuery(args, api, extraOptions)

        } else {
            //En caso no se obtenga una respuesta, se procedera a eliminar los tokens y la cookie con el reducer logOut
            api.dispatch(logOut())
        
        }
    }
    return result
}

//Exportamos la api con la funcion createApi de RTKQuery usando como baseQuery la funcion anteriormente creada
export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    //Y estableciendo los endpoints con un objeto vacio dado que luego sera manipulado
    endpoints: () => ({})
})