const express = require('express')
const router = express.Router()
const User = require('../model/user')
const passport = require('passport')
const LocalStrategy = require('passport-local')

router.use(passport.initialize())
router.use(passport.session())

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})


passport.use(new LocalStrategy(async(username, password, done) => {
    const user = await User.findOne({ username })
    if (user) {
        const isValid = await user.checkPassword(password)
        if (isValid) {
            return done(null, user)
        } else {
            return done(null, false)
        }
    } else {
        return done(null, false)
    }
}))

router.use((req, res, next) => {
    if (req.query.fail) {
        res.locals.error = req.query.fail
    }
    if (req.isAuthenticated()) {
        req.session.user = req.user
        res.locals.user = req.session.user
        if (!req.session.role) {
            req.session.role = req.user.roles[0]
        }
        res.locals.role = req.session.role
    }
    next()
})


router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login?fail=true',
    failureFlash: false
}))

router.get('/change-role/:role', (req, res) => {
    if (req.isAuthenticated()) {
        if (req.session.user.roles.indexOf(req.params.role) >= 0) {
            req.session.role = req.params.role
            res.locals.role = req.session.role
        }
    }
    res.render('index')
})

module.exports = router