import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../api/authSlice'
import { apiSlice } from '../api/main/apiSlice'


//Configuramos el almacen de los estados de Redux
export const store = configureStore({
    //Establecemos los reducers de los estados de auth y los custom hooks de la api
    reducer: {
        [apiSlice.reducerPath] : apiSlice.reducer,
        auth: authReducer,
    },
    //Configuramos el middleware de RTK Query
    middleware: getdefaultMiddleware => 
        getdefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})
//Esta variable sera establecida dentro de App.js