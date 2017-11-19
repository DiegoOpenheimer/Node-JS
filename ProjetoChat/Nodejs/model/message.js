const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
    author: String,
    when: Date,
    typeMsg: String,
    message: String,
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    }
})

const Message = mongoose.model('Message', MessageSchema)

module.exports = Message