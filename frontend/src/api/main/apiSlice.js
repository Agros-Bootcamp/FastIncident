import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import axios from 'axios'

import { setTokens, logOut } from "../authSlice";

const fetchUpdateTokens = async (token) => {
    try {
        const response = await axios.post('http://localhost:4000/refresh/', token)
        return response
    } catch (error) {
        console.log(error)
    }
}

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:4000/',
    credentials: 'include',
    prepareHeaders: (headers, {getState}) => {
        const token = getState.auth.access;
        if(token!==undefined) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReAuth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if ( result?.error?.status === 401) {

        const refreshToken = api.getState().auth.access
        const refreshResult = await fetchUpdateTokens(refreshToken)

        if (result?.data) {

            api.dispatch(setTokens(refreshResult.data))
            result = await baseQuery(args, api, extraOptions)

        } else {

            api.dispatch(logOut())

        }

        return result

    }
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
    endpoints: () => ({})
})