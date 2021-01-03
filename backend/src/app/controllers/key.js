const createKey = require('../model/keys/createKeys')
const listKeys = require('../model/keys/list')
const getKeyData = require('../model/keys/getKeyData')
const searchKey = require('../model/keys/search')
const verifyTitle = require('../model/keys/verifyTitle')

const keyController = {
    create: async (request, response) => {
        console.log('Creating keys...')
        const { title, description, keys, label } = request.body;
        const user = request.user
        const status = await createKey(title, description, keys, user, label)
        if(request.token) {
            status.token = request.token
            status.refreshToken = request.refreshToken
        }
        return response.json(status).status(status.status)
   },
   index: async (request, response) => {
       console.log('Listing labels...')
       const status = await listKeys()
       return response.json(status).status(status.status)
   },
   singleKey: async(request, response) => {
       const { title } = request.body
       console.log(`Returning data from ${title}...`)
       const status = await getKeyData(title)
       return response.json(status).status(status.status)
   },
   search: async (request, response) => {
       const { text } = request.body
       console.log(`Searching for ${text}...`)
       const status = await searchKey(text)
       return response.json(status).status(status.status)
   },
   verifyTitle: async(request, response) => {
       const { title } = request.body
       console.log(`Verifying title ${title}...`)
       const status = await verifyTitle(title)
       return response.json(status).status(status.status)
   }
}

module.exports = keyController