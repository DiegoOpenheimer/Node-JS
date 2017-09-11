const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    if ('user' in req.session) {
        req.session.destroy()
    }
    res.redirect('/login')
})

module.exports = router