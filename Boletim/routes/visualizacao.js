const express = require('express')
const router = express.Router()
const visualizacaoController = require('../controller/visualizacao')
const model = require('../models/index')

router.get('/', visualizacaoController.getTable.bind(null, model.models))

module.exports = router
