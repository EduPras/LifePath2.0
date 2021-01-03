import axios from 'axios';

const TOKEN = 'lifepath_token'
const REFRESH_TOKEN = 'lifepath_refreshToken'
const USER = 'lifepath_username'

const api = axios.create({
    baseURL: 'http://localhost:3333',
})

const setTokens = (token, refreshToken) => {
    localStorage.setItem(TOKEN, token)
    localStorage.setItem(REFRESH_TOKEN, refreshToken)
}

const getHeaders = () => {
    let hdrs = {
        headers:{
            Authorization: localStorage.getItem(TOKEN),
            'x-refresh-token': localStorage.getItem(REFRESH_TOKEN)
        }
    }
    return hdrs
}

const setUser = user => localStorage.setItem(USER, user)
export const getUser = () => localStorage.getItem(USER)

// User requests
export const createUser = async body => {
    try {
        const { data }= await api.post('/user/create', body)
        setTokens(data.token, data.refreshToken)
        setUser(data.user)
        return data
    } catch (error) {
        console.log(error)
    }    
}

export const login = async body => {
    try {
        const { data }= await api.post('/user/login', body)
        setTokens(data.token, data.refreshToken)
        setUser(data.user)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const authed = () => {
    let token = localStorage.getItem(TOKEN) 
    return !!token
}

// Keys requests
export const getAllKeys = async () => {
    try{
        const { data } = await api.get('/keys')
        return data
    }catch(error){
        console.log(error)
    }
}

export const getSingleKeyData = async title => {
    try {
        const { data } = await api.post(`/keys/title`, {title})
        return data
    } catch (error) {
        console.log(error)
    }
}

export const searchText = async text => {
    try {
        const { data } = await api.post('/keys/search', {text})
        return data
    } catch (error) {
        console.log(error)
    }
}

export const keysCreatedByUser = async user => {
    try{
        const { data } = await api.post('/keys/user', {user})
        return data
    } catch (error){
        console.log(error)
    }
}

export const verifyTitle = async title =>{    
    try {
        const { data } = await api.post('/keys/verifytitle', {title})
        return data
    } catch (error) {
        console.log(error)
    }
    
}

export const createKeys = async body => {
    try {
        const { data } = await api.post('/keys/create', body, getHeaders())
        return data
    } catch (error) {
        console.log(error)
    }
}