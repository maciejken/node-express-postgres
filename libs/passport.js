'use strict';
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/models/index.js').User;
const logger = require('winston');

module.exports = function () {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        return User.findById(id).then(function (user) {
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
            return User.findOne({where: {email: email}}).then(function (user) {
                if (user) {
                    logger.info('That email is already taken');
                    done(null, false, req.flash('signupMessage', 'That email is already taken'));
                } else {
                    const data = {
                        email: email,
                        password: password,
                        lastLogin: new Date()
                    };

                    return User.create(data).then(function (newUser) {
                        if (!newUser) {
                            done(null, false);
                        } else {
                            logger.info('Created new user:', newUser.get());
                            done(null, newUser, req.flash('signupMessage', 'Created new user'));
                        }
                    }).catch(function (err) {
                        logger.error('Error:', err);
                        done(null, false, req.flash('signupMessage', 'Something went wrong with your signup'));
                    });
                }
            }).catch(function (err) {
                logger.error('Error:', err);
                done(null, false, req.flash('signupMessage', 'Something went wrong with your signup'));
            });
        })
    );

    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            return User.findOne({where: {email: email}}).then(function (user) {
                if (!user) {
                    logger.info('Incorrect username');
                    done(null, false, req.flash('loginMessage', 'Incorrect username'));
                } else if (!user.validatePassword(password)) {
                    logger.info('Incorrect password');
                    done(null, false, req.flash('loginMessage', 'Incorrect password'));
                } else {
                    return user.update({
                        lastLogin: new Date()
                    }).then(function (updatedUser) {
                        done(null, updatedUser.get());
                    }).catch(function (err) {
                        logger.error('Error:', err);
                        done(null, false, req.flash('loginMessage', 'Something went wrong with your login'));
                    });
                }
            }).catch(function (err) {
                logger.error('Error:', err);
                done(null, false, req.flash('loginMessage', 'Something went wrong with your login'));
            });
        })
    );
};
