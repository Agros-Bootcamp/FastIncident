import { apiSlice } from "./main/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: cred => ({
                url: 'login/',
                method: 'POST',
                body: { ...cred }
            })
        }),
    })
})

export const { useLoginMutation } = authApiSlice