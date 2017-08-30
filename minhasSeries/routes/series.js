const express = require('express')
const route = express.Router()
const serieController = require('../controllers/series')

const serie = require('../models/series')
const models = {
    serie
}

route.get('/', serieController.serieIndex.bind(null, models))
route.get('/nova', serieController.serieForm)
route.post('/nova', serieController.salvarSerie.bind(null, models))
route.get('/delete/:id', serieController.deleteSerie.bind(null, models))
route.post('/edit/:id', serieController.editSerie.bind(null, models))
route.get('/info/:id', serieController.infoOne.bind(null, models))
route.post('/info/:id', serieController.addComments.bind(null, models))
route.post('/info/:id/:index', serieController.deleteComments.bind(null, models))

module.exports = route
