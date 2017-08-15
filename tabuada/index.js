const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require('path')


const tabuadaRouter = require('./route/tabuada')
const routeIndex = require('./route/index')


//view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// controllers
app.use('/', routeIndex.route)
app.use('/tabuada', tabuadaRouter.route)

//reconhecendo pasta static onde contém os arquivos de bootstrap
app.use(express.static('public'))

app.listen(port, () => console.log('Server running on port ' + port))