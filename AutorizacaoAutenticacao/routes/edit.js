const express = require('express')
const router = express.Router()

const Noticia = require('../model/noticia')
const noticiaController = require('../controllers/edit')

router.get('/:id', (req, res, next) => {
    if ('user' in req.session) {
        if (req.session.user.roles.indexOf('admin')) {
            return next()
        } else {
            res.redirect('/')
        }
    } else {
        res.redirect('/')
    }
})

router.get('/:id', noticiaController.noticiaForm.bind(null, Noticia))
router.post('/:id', noticiaController.noticiaEdit.bind(null, Noticia))

module.exports = router