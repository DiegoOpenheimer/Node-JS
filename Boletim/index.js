const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require('path')
const model = require('./models/index')
const bodyParser = require('body-parser')
//routes
const indexRoutes = require('./routes/index')
const createRoutes = require('./routes/create')
const visualizacaoRoutes = require('./routes/visualizacao')
//settind body-parser
app.use(bodyParser.urlencoded({extended: true}))


//setting public folder to bootstrap and styles
app.use(express.static('public'))

//setting view engine to express
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


//setting routes
app.use('/', indexRoutes)
app.use('/create', createRoutes)
app.use('/visualizacao', visualizacaoRoutes)


model.sequelize.sync().then(() => {
    app.listen(port, () => console.log('Server running on port ' + port))
    console.log('synced')
}).catch(( err ) => {
    console.log('Não foi possível sincronizar ao banco de dados, ERROR ' + err )
})