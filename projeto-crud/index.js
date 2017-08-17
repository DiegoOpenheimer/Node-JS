const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
//import routes
const indexRoutes = require('./routes/index')
const pessoasRoutes = require('./routes/pessoas')

//import db
const mysql = require('mysql')
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'cadastro'
})

const dependencies = {
    connection
}

//set body parser
app.use(bodyParser.urlencoded({extended: false}))

//set engine to express
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//Static files
app.use(express.static('public'))

//controllers
app.use('/', indexRoutes)
app.use('/pessoas', pessoasRoutes(dependencies))



//starter
connection.connect((err) => {
    if (err) {
        console.log('fail to connect to DB')
        return false
    }
    app.listen(port, () => console.log('Server running on port ' + port))
})