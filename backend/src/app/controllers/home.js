const createUser = require('../model/user/login')

const homeController = {
    index: async (request, response) => {
        const {user, password } = request.body
        const message = await createUser(user, password)
        console.log(message)
        return response.json({message:`Created user ${user}`})
}

}

module.exports= homeController