const express = require('express')
const pessoasController = require('../controller/pessoas')


const pessoasRouter = ({ connection }) => {
    const router = express.Router()
    router.get('/', pessoasController.index.bind(null, connection))
    router.get('/delete/:id', pessoasController.deleteRoute.bind(null, connection))
    router.get('/create', pessoasController.create)
    router.post('/create', pessoasController.add.bind(null, connection))
    router.post('/edit/:id', pessoasController.edit.bind(null, connection))
    return router
}


module.exports = pessoasRouter