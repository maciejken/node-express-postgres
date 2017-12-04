const express = require('express');
const consign = require('consign');
const app = express();

consign()
    .include('config/config.js')
    .then('libs/db.js')
    // .then('libs/auth.js')
    .then('libs/middlewares.js')
    .then('app/routes')
    .then('libs/boot.js')
    .into(app);

module.exports = app;