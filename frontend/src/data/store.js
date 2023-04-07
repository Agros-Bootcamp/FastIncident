import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../api/authSlice'
import { apiSlice } from '../api/main/apiSlice'


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath] : apiSlice.reducer,
        auth: authReducer,
    },
    middleware: getdefaultMiddleware => 
        getdefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})