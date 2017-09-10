const express = require('express')
const router = express.Router()

const Noticia = require('../model/noticia')

router.get('/', async(req, res) => {
    let conditions = {}
    if (!('user' in req.session)) {
        conditions = {
            category: 'Public'
        }
    }
    const noticias = await Noticia.find(conditions)

    res.render('noticias/publicas', { noticias })

})

module.exports = router