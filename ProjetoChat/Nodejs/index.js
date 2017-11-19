const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const jwtSecret = process.env.JWT_SECRET || 'socket.io with react'
const bodyParser = require('body-parser')
const sessionExpress = require('express-session')
const http = require('http').Server(app)
const io = require('socket.io')(http)
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongo = process.env.MONGODB || 'mongodb://localhost/chatSocketIO'
const redis = require('socket.io-redis')

const jwt = require('jsonwebtoken')

const cors = require('cors')
const corsOption = {
    origin: 'http://localhost:3000'
}


app.use(cors(corsOption))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const sharedSession = require('express-socket.io-session')
const session = sessionExpress({
    saveUninitialized: false,
    resave: false,
    secret: 'chat'
})

app.use(session)
io.adapter(redis())
io.use(sharedSession(session), {autoSave: true})
io.use(async (socket, next) => {
if(!socket.handshake.query.token) {
    next(new Error('Auth failed.'))
} else {
    const isValid = await jwt.verify(socket.handshake.query.token, jwtSecret)
    if(!isValid) {
        next(new Error('Auth failed.'))
    }
   next()     
}  
})

app.set('view engine', 'ejs')
app.use(express.static('public'))


app.get('/', (req, res) => {
    res.render('home')
})

app.post('/auth', async (req, res) => {
    // if(!req.body.name) {
    //     res.redirect('/')
    // } else {
    //     req.session.user = {
    //         username: req.body.name
    //     }
    //     res.redirect('/room')
    // }
    const token = await jwt.sign({
        name: req.body.name || 'User'
    }, jwtSecret)
       res.send({
        token: token
    })

})

app.get('/room', (req, res) => {
    if(!req.session.user){
        res.redirect('/')
        return false
    } else {
        res.render('room')
    }
})



const Room = require('./model/room')
const Message = require('./model/message')


io.on('connection', socket => {
    socket.on('addRoom', roomName => {
        const room = new Room({
            name: roomName
        })
        room.save()
            .then(() => {
                io.emit('addRoom', room)
            })
    })
    
    Room.find({}, (err, res) => {
        socket.emit('listRooms', res)
    })

    socket.on('join', roomId => {
          
        socket.join(roomId)
        Message.find({room: roomId}, (err, res) => {
            socket.emit('listMsg', res)
        })
    })

    socket.on('newMsg', async msg => {
        const decoded = await jwt.decode(socket.handshake.query.token)
        const ms = new Message({
            author: decoded.name,
            when: new Date(),
            typeMsg:'text',
            message: msg.message,
            room: msg.roomId
        })
        ms.save()
          .then(() => {
              io.emit('newMsg', ms)
          })
    })

    socket.on('sendAudio', audio => {
        const decoded = jwt.decode(socket.handshake.query.token)
        const mensagemAudio = new Message({
            author: decoded.name,
            when: new Date(),
            typeMsg:'audio',
            message:audio.data,
            room:audio.roomId
        })

        mensagemAudio.save()
                     .then(() => {
                     io.emit('newAudio', mensagemAudio)
                    })
                     
    })
})



mongoose.connect(mongo, {useMongoClient: true})
        .then(() => {
            http.listen(port, e => {
                if(e) {
                    console.log(e)
                } else {
                    console.log('Server running on port ' + port)
                }
            })
        })
        .catch( e => {
            console.log(e)
        })