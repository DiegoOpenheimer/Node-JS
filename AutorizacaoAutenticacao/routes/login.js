const express = require('express')
const router = express.Router()
const User = require('../model/user')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

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

passport.use(new GoogleStrategy({
    clientID: '680331637887-f83lcq8pcpfijo6042pgb64gkpdghqtn.apps.googleusercontent.com',
    clientSecret: 'e5Fz6x2nYBz84dutTa4xaEG7',
    callbackURL: 'http://localhost:3000/google/callback'
}, async(accessToken, refreshToken, profile, done) => {
    const userDB = await User.findOne({ googleID: profile.id })
    if (!userDB) {
        const user = new User({
            name: profile.displayName,
            googleID: profile.id,
            roles: ['restrito']
        })
        await user.save()
        return done(null, user)
    } else {
        return done(null, userDB)
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

router.get('/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile'] }))
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '/'
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