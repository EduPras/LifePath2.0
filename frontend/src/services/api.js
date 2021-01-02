import axios from 'axios';

const TOKEN = 'lifepath_token'
const REFRESH_TOKEN = 'lifepath_refreshToken'

const api = axios.create({
    baseURL: 'http://localhost:3333',
})

const setTokens = (token, refreshToken) => {
    localStorage.setItem(TOKEN, token)
    localStorage.setItem(REFRESH_TOKEN, refreshToken)
}



export const createUser = async body => {
    try {
        const { data }= await api.post('/user/create', body)
        setTokens(data.token, data.refreshToken)
    } catch (error) {
        console.log(error)
    }    
}

export const login = async body => {
    try {
        const { data }= await api.post('/user/login', body)
        setTokens(data.token, data.refreshToken)
    } catch (error) {
        console.log(error)
    }
}

export const authed = () => {
    let token = localStorage.getItem(TOKEN) 
    return !!token
}