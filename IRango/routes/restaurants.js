const express = require('express')
const router = express.Router()
const Restaurants = require('../models/restaurants')
const restaurantsController = require('../controllers/restaurants')

router.get('/', restaurantsController.restaurants.bind(null, Restaurants))
router.get('/distancia', restaurantsController.distRestaurants.bind(null, Restaurants))
router.get('/excluir/:id', restaurantsController.deleteRestaurants.bind(null, Restaurants))
router.get('/novo', restaurantsController.formRestaurants)
router.post('/novo', restaurantsController.saveRestaurants.bind(null, Restaurants))

module.exports = router