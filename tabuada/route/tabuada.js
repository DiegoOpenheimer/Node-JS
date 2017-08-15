const express = require('express')
const route = express.Router()
const tabuada = require('../controller/tabuada')


route.get('/', tabuada.list)
route.get('/do/:num', tabuada.valor)


module.exports = { route }