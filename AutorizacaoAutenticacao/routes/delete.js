const express = require('express')
const router = express.Router()

const Noticia = require('../model/noticia')
const deleteController = require('../controllers/delete')

router.get('/:id', (req, res, next) => {
    if ('user' in req.session) {
        if (req.session.user.roles.indexOf('admin') >= 0) {
            return next()
        } else {
            res.redirect('/')
        }
    } else {
        res.redirect('/')
    }
})

router.get('/:id', deleteController.deleteNoticia.bind(null, Noticia))


module.exports = router