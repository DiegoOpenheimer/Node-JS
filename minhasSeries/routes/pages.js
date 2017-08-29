const express = require('express')
const route = express.Router()
const pagesController = require('../controllers/pages')

route.get('/', pagesController.index)
route.get('/sobre', pagesController.about)

module.exports = route