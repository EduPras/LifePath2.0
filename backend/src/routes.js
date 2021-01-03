const express = require('express')
const routes = express.Router()
const userController = require('./app/controllers/user')
const keyController = require('./app/controllers/key')
const Token = require('./app/middlewares/auth')

//login
routes.post('/user/login', userController.index)
routes.post('/user/create', userController.create)

//token
routes.post('/user/refresh', Token.refreshToken)

//queries
routes.post('/keys/create', Token.verifyToken, keyController.create)
routes.post('/keys/verifytitle', keyController.verifyTitle)
routes.post('/keys/user',  userController.list)
routes.get('/keys', keyController.index)
routes.post('/keys/title', keyController.singleKey)
routes.post('/keys/search', keyController.search)

module.exports = routes 