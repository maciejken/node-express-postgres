'use strict';
const passport = require('passport');
const logger = require('winston');
const authController = require('../controllers/index.js').auth;

module.exports = function (app) {

    app.get('/', isLoggedOut, authController.index);
    app.get('/login', isLoggedOut, authController.login);
    app.post('/login', isLoggedOut, passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));
    app.get('/signup', isLoggedOut, authController.signup);
    app.post('/signup', isLoggedOut, passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));
    app.get('/profile', isLoggedIn, authController.profile);
    app.get('/logout', isLoggedIn, authController.logout);
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        logger.info('Unauthenticated! Redirecting to home page');
        res.redirect('/');
    }
}

function isLoggedOut(req, res, next) {
    if (req.isUnauthenticated()) {
        next();
    } else {
        logger.info('Authenticated! Redirecting to profile page');
        res.redirect('/profile');
    }
}
