'use strict';
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/models/user_new');

module.exports = function () {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            process.nextTick(function () {
                User.findOne({'local.email': email}, function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {
                        const newUser = new User();
                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);

                        newUser.save(function (err) {
                            if (err) {
                                throw err;
                            }
                            return done(null, newUser, req.flash('loginMessage', 'Created new account.'));
                        });
                    }
                });
            });
        })
    );

    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            User.findOne({'local.email': email}, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, req.flash('loginMessage', 'Incorrect username'));
                }
                if (!user.validPassword(password)) {
                    return done(null, false, req.flash('loginMessage', 'Incorrect password.'));
                }
                return done(null, user);
            });

        })
    );
};