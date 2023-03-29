import axios from 'axios'

const BASE_URL = ''

export const loginURL = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})