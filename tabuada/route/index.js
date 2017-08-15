const express = require('express')
const route = express.Router()
const index = require('../controller/index')


route.get('/', index.indexController)

module.exports = {
    route
}