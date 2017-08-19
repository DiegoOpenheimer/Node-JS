const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const path = require('path')
const indexRouter = require('./routes/index')
const pessoasRouter = require('./routes/pessoas')
const model = require('./models/index')

//public folder to bootstrap
app.use(express.static('public'))

//setting app to post with body-parser
app.use(bodyParser.urlencoded({ extended: true }))

//setting the path of app
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//routes
app.use('/', indexRouter)
app.use('/pessoas', pessoasRouter)

//sync with DB
model.sequelize.sync({force: true}).then(() => {
    app.listen(port, () => console.log('CRUD-ORM listenning on port ' + port))
})