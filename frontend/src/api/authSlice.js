import { createSlice } from "@reduxjs/toolkit";
import jwt_encode from 'jwt-decode'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const cookieData = cookies.get('tokens')

// const initialState = {
//     ...cookieData,
//     online: true,
//     UserInfo: jwt_encode(cookieData.access)
// } || {
//     access: undefined,
//     refresh: undefined,
//     UserInfo: undefined,
//     online: false
// }

const initialState = cookieData? {
    ...cookieData,
    online: true,
    UserInfo: jwt_encode(cookieData.access)
} : {
    access: undefined,
    refresh: undefined,
    UserInfo: undefined,
    online: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setTokens: (state, {payload}) => {
            state.access = payload.access
            state.refresh = payload.refresh
            state.UserInfo = jwt_encode(payload.access)
            state.online=true
            cookies.set('tokens', payload, {
                path: '/'
            })
        },
        logOut: (state) => {
            state.access = undefined
            state.refresh = undefined
            state.UserInfo = undefined
            state.online = false
            cookies.remove('tokens')
        }
    }
})

export const { setTokens, logOut } = authSlice.actions

export default authSlice.reducer