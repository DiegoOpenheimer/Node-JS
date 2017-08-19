const model = require('../models/index')

const controllerPessoas = require('../controller/pessoas')
const express = require('express')
const router = express.Router()

router.get('/', controllerPessoas.pessoas.bind(null, model.models))
router.get('/delete/:id', controllerPessoas.deleteOne.bind(null, model.models))
router.get('/create', controllerPessoas.pessoasCreate)
router.post('/create', controllerPessoas.addPessoa.bind(null, model.models))
router.post('/edit/:id', controllerPessoas.updatePessoas.bind(null, model.models))

module.exports = router