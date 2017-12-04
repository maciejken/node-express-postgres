const express = require('express');
const consign = require('consign');
const app = express();

consign()
    .include('config/config.js')
    .then('db.js')
    // .then('auth.js')
    .then('middlewares.js')
    .then('app/routes')
    .then('boot.js')
    .into(app);

module.exports = app;