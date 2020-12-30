const login = require('../model/user/login')
const createUser = require('../model/user/create')
const listUserKeys = require('../model/user/listKeys')

const userController = {
    // verify if user exists & compare hashed passwords
    index: async (request, response) => {
        console.log('Checking user login... OF: '+ request.body.user)
        const {user, password } = request.body
        const status = await login(user, password)
        response.status(status.status).json(status)
    },  
    // check if a user already exists, then create one
    create: async(request, response) => {
        console.log('Creating user...')
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
        
        response.status(status.status).json(status)
    },
    // list keys created by the user
    list: async (request, response) => {
        const { user } = request.body
        console.log(`Listing keys created by ${user}...`)
        const status = await listUserKeys(user)
        response.status(status.status).json(status)
    }

}

module.exports= userController