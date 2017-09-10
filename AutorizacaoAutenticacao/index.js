const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const mongo = process.env.MONGODB || 'mongodb://localhost:27017/noticias'
const User = require('./model/user')
const noticias = require('./routes/noticia')
const restrito = require('./routes/restrito')
const login = require('./routes/login')
const logout = require('./routes/logout')
const admin = require('./routes/admin')
const deleteNotice = require('./routes/delete')
const edit = require('./routes/edit')

//setting express to get request post
app.use(bodyParser.urlencoded({ extended: true }))

//setting source public to express
app.use(express.static('public'))

//setting session
app.use(session({ secret: 'Authenticate' }))

//setting engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use((req, res, next) => {
    if ('user' in req.session) {
        res.locals.user = req.session.user
        res.locals.role = req.session.role
    }
    next()
})

app.get('/', (req, res) => {
    res.render('index')
})



//setting routes
app.use('/noticias', noticias)
app.use('/restrito', restrito)
app.use('/login', login)
app.use('/logout', logout)
app.use('/admin', admin)
app.use('/delete', deleteNotice)
app.use('/edit', edit)

const checkUser = async user => {
    const total = await user.count()

    if (total == 0) {
        const usuario = new user({
            username: 'DiegoOpenheimer',
            password: 'abc123',
            roles: ['restrito', 'admin']

        })
        await usuario.save()
        const user2 = new user({
            username: 'Beltrano',
            password: 'abc123',
            roles: ['restrito']
        })
        await user2.save()
    } else {
        return
    }
}


mongoose.connect(mongo, { useMongoClient: true })
    .then(async() => {
        await checkUser(User)
        app.listen(port, () => console.log('Server running on port ' + port))

    })
    .catch(e => console.log('Error ao conectar ao banco de dados ' + e))