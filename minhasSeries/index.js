const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const mongo = process.env.MONGODB || 'mongodb://localhost/minhas-series'

const indexRoute = require('./routes/pages')
const serieRoute = require('./routes/series')

//assets
app.use(express.static('public'))

//setting to receive method POST
app.use(bodyParser.urlencoded({
    extended: true
}))

//setting engine to express
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//setting routes
app.use('/', indexRoute)
app.use('/series', serieRoute)


mongoose.connect(mongo, {
        useMongoClient: true
    })
    .then(() => {
        app.listen(port, () => console.log('Server Listening on port ' + port))
    })
    .catch(e => {
        console.log('Error ao conectar ao banco de dados ' + e)
    })