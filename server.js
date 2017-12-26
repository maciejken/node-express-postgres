'use strict';
const express = require('express');
const consign = require('consign');
const app = express();

let cwd = process.env.NODE_ENV === 'production' ? process.cwd() : process.cwd();

consign({cwd: cwd})
    .include('libs/logger.js')
    .then('config/config.js')
    .then('libs/passport.js')
    .then('libs/db.js')
    .then('libs/middlewares.js')
    .then('app/routes')
    .then('libs/boot.js')
    .into(app);

module.exports = app;