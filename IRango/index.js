const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const mongo = 'mongodb://localhost/IRango'

const index = require('./routes/index')
const restaurants = require('./routes/restaurants')

app.set('view engine', 'ejs')


app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/', index)
app.use('/restaurants', restaurants)




mongoose.connect(mongo, { useMongoClient: true })
    .then(() => {
        app.listen(port, () =>
            console.log("Server running on port " + port)

        )
    })
    .catch(e => consmongoose.ConnectionBase.forEach(e => console.log(e)))