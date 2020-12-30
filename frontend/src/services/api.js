import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333',
})

export const createUser = async body => {
    try {
        const {token, refreshToken} = await api.post('/user/create', body)
        localStorage.setItem('token', token)
        localStorage.setItem('refreshToken', refreshToken)
    } catch (error) {
        console.log(error)
    }    
}