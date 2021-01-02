const login = require('../model/user/login')
const createUser = require('../model/user/create')
const listUserKeys = require('../model/user/listKeys')

const userController = {
    // verify if user exists & compare hashed passwords
    index: async (request, response) => {
        console.log('Checking user login... OF: '+ request.body.username)
        const {username, password } = request.body
        const status = await login(username, password)
        response.json(status).status(status.status)
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
        
        response.json(status).status(status.status)
    },
    // list keys created by the user
    list: async (request, response) => {
        const { user } = request.body
        console.log(`Listing keys created by ${user}...`)
        const status = await listUserKeys(user)
        response.json(status).status(status.status)
    }

}

module.exports= userController