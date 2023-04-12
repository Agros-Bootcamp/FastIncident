import { createSlice } from "@reduxjs/toolkit";
import jwt_encode from 'jwt-decode'
import Cookies from 'universal-cookie'

//Clase para crear cookies
const cookies = new Cookies()

//Obtenemos el cookie de los tokens (En caso exista)
const cookieData = cookies.get('tokens')

//Establecemos el estado inicial segun exista la cookie de los tokens o no
const initialState = cookieData? {
    ...cookieData,
    online: true,
    UserInfo: jwt_encode(cookieData.accessToken).UserInfo
} : {
    accessToken: undefined,
    refreshToken: undefined,
    UserInfo: undefined,
    online: false
}

//Creacion de estado de los tokens
const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {

        //Reducer para establecer los tokens de acceso, refresco y la informacion del usuario
        setTokens: (state, {payload}) => {

            state.accessToken = payload.accessToken
            state.refreshToken = payload.refreshToken
            console.log(payload)
            //La informacion del usuario se encuentra decodificada dentro del token de acceso
            state.UserInfo = jwt_encode(state.accessToken).UserInfo
            //Establece que el usuario se encuentra online
            state.online=true
            //Crea la cookie que almacena los tokens
            cookies.set('tokens', payload, {
                path: '/'
            })
        },
        //Reducer para eliminar los tokens y la informacion del usuario
        logOut: (state) => {
            state.access = undefined
            state.refresh = undefined
            state.UserInfo = undefined
            state.online = false
            //Remueve la cookie de los tokens
            cookies.remove('tokens')
        }
    }
})

//Exportamos los reducers para que sean utilizados en otras partes del frontend
export const { setTokens, logOut } = authSlice.actions

export default authSlice.reducer