const express = require('express')
const routes = express.Router()
const homeController = require('./app/controllers/home')
const keyController = require('./app/controllers/key')

//login
routes.get('/user/login', homeController.index)
routes.post('/user/create', homeController.create)

//queries
routes.post('/keys/create', keyController.create)

module.exports = routes 