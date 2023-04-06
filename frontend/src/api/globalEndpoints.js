import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const globalApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/'
    }),
    endpoints: builder => ({
        register: builder.mutation({
            query: data => ({
                url: 'register/',
                method: 'POST',
                body: { ...data }
            })
        })
    })
})

export const { useRegisterMutation } = globalApi