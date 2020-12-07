const express = require('express')
const routes = express.Router()
const homeController = require('./app/controllers/home')

//login
routes.get('/user/login', homeController.index)
routes.post('/user/create', homeController.create)

module.exports = routes 