import { apiSlice } from "./main/apiSlice"

//Importamos la api de apiSlice, e incluimos los endpoints de la URL Base a la que se realizaran las peticiones
export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        //Enpoint para obtener los tokens de acceso y refresco enviando un JSON con el email y la contraseña
        login: builder.mutation({
            query: cred => ({
                url: 'login/',
                method: 'POST',
                body: { ...cred }
            })
        }),
        //Endpoint para crear un usuario, se debe enviar un JSON con los apartados solicitados en el modelo de la base de datos
        register: builder.mutation({
            query: cred => ({
                url: 'register/',
                method: 'POST',
                body: {...cred}
            })
        }),
        //Endpoint para crear tarea, se debe enviar un JSON con los apartados solicitados en el modelo de la base de datos
        createTask: builder.mutation({
            query: cred => ({
                url: 'createTask/',
                method: 'POST',
                body: {...cred}
            })
        })
    })
})

//Despues de agregar cada endpoint, RTK Query genera Custom Hooks con los cuales se podran realizar las peticiones hacia estos endpoints
export const { useLoginMutation, useRegisterMutation, useCreateTaskMutation } = authApiSlice