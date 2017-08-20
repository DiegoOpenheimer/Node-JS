const express = require('express')
const router = express.Router()
const indexController = require('../controller/index')
const model = require('../models/index')

router.get('/', indexController.index.bind(null, model.models))
router.post('/', indexController.indexEdit.bind(null, model.models))

module.exports = router
