const mongoose = require('mongoose')

const restaurants = async(Restaurants, req, res) => {
    const restaurants = await Restaurants.find({})
    res.render('restaurants/restaurants', { restaurants })
}

const formRestaurants = (req, res) => {
    res.render('restaurants/formRestaurants')
}

const saveRestaurants = async(Restaurant, req, res) => {
    const restaurantNovo = new Restaurant({
        name: req.body.restaurante,
        loc: [parseFloat(req.body.lat), parseFloat(req.body.lng)]
    })

    await restaurantNovo.save()
    res.redirect('/restaurants')
}

const deleteRestaurants = async(Restaurants, req, res) => {
    await Restaurants.remove({ _id: req.params.id })
    res.redirect('/restaurants')
}

const distRestaurants = async(Restaurants, req, res) => {
    const count = await Restaurants.count()
    if (!count) {
        res.locals.error404 = true
        res.render('restaurants/restaurants_distancia_map')
        return false
    } else {
        res.locals.error404 = false
    }
    const { lat, lng } = req.query
    if (!lat || !lng) {
        res.render('restaurants/restaurants_distancia_map')
    } else {
        mongoose.connections[0].db.command({
            geoNear: 'restaurants',
            near: [parseFloat(req.query.lat), parseFloat(req.query.lng)],
            spherical: true,
            distanceMultiplier: 6378.1
        }, (err, results) => {
            if (err) {
                res.locals.errorFailed = true
                res.render('restaurants/restaurants_distancia_map')
            } else {
                res.locals.errorFailed = false
            }
            res.render('restaurants/showDistance', { results, lat, lng })
        })
    }
}

module.exports = {
    restaurants,
    formRestaurants,
    saveRestaurants,
    distRestaurants,
    deleteRestaurants
}