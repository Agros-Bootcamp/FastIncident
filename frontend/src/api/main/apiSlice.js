import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import axios from 'axios'

import { setTokens, logOut } from "../authSlice";

const fetchUpdateTokens = async (token) => {
    try {
        const response = await axios.post('http://localhost:4000/refreshToken/', token)
        if(response) return response
    } catch (error) {
        console.log(error)
    }
}

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:4000/',
    // credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const {accessToken} = getState().auth
        if (accessToken!==undefined) {
            headers.set('authorization', `Bearer ${accessToken}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if ( result?.error?.originalStatus === 403 ){

        const {refreshToken} = api.getState().auth
        console.log(refreshToken)

        const refreshResult = await fetchUpdateTokens({
            refreshToken: refreshToken
        })

        console.log(refreshResult)
        if(refreshResult?.data) {

            api.dispatch(setTokens(refreshResult.data))
            result = await baseQuery(args, api, extraOptions)

        } else {

            api.dispatch(logOut())
        
        }
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({})
})