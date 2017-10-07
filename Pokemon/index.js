const express = require('express')
const port = process.env.PORT || 3000
const app = express()
const compression = require('compression')

//routes
const index = require('./routes/index')
const getPokemon = require('./routes/getPokemon')
const listItems = require('./routes/listItems')

//setting public paste
app.use(express.static('public'))

app.use(compression())

//setting view engine for express
app.set('view engine', 'ejs')

app.use('/', index)
app.use('/pokemons', getPokemon)
app.use('/items', listItems)



app.listen(port, () => console.log('Server running on port ' + port))
