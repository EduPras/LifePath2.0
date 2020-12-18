const createKey = require('../model/keys/createKeys')

const keyController = {
    create: async (request, response) => {
        console.log('Creating keys...')
        const { title, description, keys, sentences, user } = request.body;

        const status = await createKey(title, description, keys, sentences, user)
        return response.json(status)
   }
}

module.exports = keyController