const express = require('express')
const router = express.Router()
const createController = require('../controller/create')
const model = require('../models/index')

router.get('/', createController.createForm)
router.post('/', createController.addDisciplina.bind(null, model.models))

module.exports = router
