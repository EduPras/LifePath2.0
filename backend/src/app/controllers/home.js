const login = require('../model/user/login')
const createUser = require('../model/user/create')

const homeController = {
    index: async (request, response) => {
        const {user, password } = request.body
        const status = await login(user, password)
        return response.json(status)
    },  
    create: async(request, response) => {
        const { 
            username,
            password,
            name,
            email
        } = request.body
        const status = await createUser( 
            username,
            password,
            name,
            email )
        return response.json(status)
    }

}

module.exports= homeController