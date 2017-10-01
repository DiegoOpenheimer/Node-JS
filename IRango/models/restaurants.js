const mongoose = require('mongoose')



const RestaurantsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    loc: {
        type: [Number],
        index: '2d'
    }
})

const Restaurants = mongoose.model('Restaurants', RestaurantsSchema)


module.exports = Restaurants