const express = require('express')
const router = express.Router()
const Noticia = require('../model/noticia')



router.get('/noticia', (req, res, next) => {
    if ('user' in req.session) {
        res.locals.role = req.session.role
        return next()
    }
})


router.get('/noticia', async(req, res) => {
    const noticias = await Noticia.find({ category: 'Private' })
    res.render('noticias/restrito', { noticias })

})


module.exports = router