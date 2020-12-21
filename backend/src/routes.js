const express = require('express')
const routes = express.Router()
const userController = require('./app/controllers/user')
const keyController = require('./app/controllers/key')

//login
routes.get('/user/login', userController.index)
routes.post('/user/create', userController.create)

//queries
routes.post('/keys/create', keyController.create)
routes.get('/keys/:user',  userController.list)
routes.get('/keys', keyController.index)
module.exports = routes 