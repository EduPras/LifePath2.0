const express = require('express')
const routes = express.Router()
const homeController = require('./app/controllers/home')

//login
routes.post('/user/create', homeController.index)

module.exports = routes 