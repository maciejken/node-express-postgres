'use strict';
const passport = require('passport');
const logger = require('winston');
const authController = require('../controllers/index.js').auth;

module.exports = function (app) {

    app.get('/', authController.index);
    app.get('/login', authController.login);
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));
    app.get('/signup', authController.signup);
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));
    app.get('/profile', isLoggedIn, authController.profile);
    app.get('/logout', authController.logout);
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        logger.info('Successfully authenticated!');
        return next();
    } else {
        logger.info('Not authenticated!');
        res.redirect('/');
    }
}
