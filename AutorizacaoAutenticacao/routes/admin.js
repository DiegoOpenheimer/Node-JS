const express = require('express')
const router = express.Router()

const Noticia = require('../model/noticia')

router.get('/', (req, res, next) => {
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

router.get('/', async(req, res) => {
    const noticias = await Noticia.find({})
    res.render('admin/administrador', { noticias })
})


module.exports = router