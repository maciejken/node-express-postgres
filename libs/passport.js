'use strict';
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/models/index.js').User;
const bCrypt = require('bcrypt-nodejs');
const logger = require('winston');

module.exports = function () {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id).then(function (user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });

    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            const generateHash = function (password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };

            User.findOne({where: {email: email}}).then(function (user) {
                if (user) {
                    logger.info('That email is already taken');
                    return done(null, false, req.flash('signupMessage', 'That email is already taken'));
                } else {
                    const data = {
                        email: email,
                        password: generateHash(password),
                        lastLogin: new Date()
                    };

                    User.create(data).then(function (newUser) {
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            logger.info('Created new user:', newUser.get());
                            return done(null, newUser, req.flash('loginMessage', 'Created new user'));
                        }
                    });
                }
            });
        })
    );

    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            const isValidPassword = function (userpass, password) {
                return bCrypt.compareSync(password, userpass);
            };

            User.findOne({where: {email: email}}).then(function (user) {
                if (!user) {
                    logger.info('Incorrect username');
                    return done(null, false, req.flash('loginMessage', 'Incorrect username'));
                } else if (!isValidPassword(user.password, password)) {
                    logger.info('Incorrect password');
                    return done(null, false, req.flash('loginMessage', 'Incorrect password'));
                } else {
                    return user.update({
                        lastLogin: new Date()
                    }).then(function (user) {
                        return done(null, user.get());
                    }).catch(function (err) {
                        logger.error('Error:', err);
                        return done(null, false, req.flash('loginMessage', 'Something went wrong with your login'));
                    });
                }
            }).catch(function (err) {
                logger.error('Error:', err);
                return done(null, false, req.flash('loginMessage', 'Something went wrong with your login'));
            });
        })
    );
};
