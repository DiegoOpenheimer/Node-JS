const express = require('express')
const router = express.Router()
const User = require('../model/user')



router.get('/', (req, res) => {
    res.render('login')
})

router.post('/', async(req, res) => {
    const user = await User.findOne({ username: req.body.username })
    if (!user) {
        res.locals.errorUsuario = 'Usuário inexistente'
        res.render('login')
        return false
    }
    const isValid = await user.checkPassword(req.body.password)

    if (isValid) {
        if ('errorSenha' in res.locals) {
            delete res.locals.errorSenha
        }
        if ('errorUsuario' in res.locals) {
            delete res.locals.errorUsuario
        }
        req.session.user = user
        req.session.role = user.roles[0]
        res.locals.user = user
        res.locals.role = user.roles[0]
        res.render('index')
    } else {
        res.locals.errorSenha = 'Senha inválida'
        res.render('login')
    }



})

router.get('/change-role/:role', (req, res) => {
    if ('user' in req.session) {
        if (req.session.user.roles.indexOf(req.params.role) >= 0) {
            req.session.role = req.params.role
            res.locals.role = req.session.role
        }
    }
    res.render('index')
})

module.exports = router