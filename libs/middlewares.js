'use strict';
const bodyParser = require('body-parser');
const express = require('express');
const flash = require('connect-flash');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const path = require('path');
const logger = require('./logger.js');
const passport = require('passport');
require('./passport')(passport);

const portHttp = process.env.PORT_HTTP || 8080;
const portHttps = process.env.PORT_HTTPS || 8081;

module.exports = function (app) {
    app.set('portHttp', portHttp);
    app.set('portHttps', portHttps);
    app.use(helmet());
    app.use(cors({
        origin: ['http://localhost:' + portHttps],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ["Origin, X-Requested-With, Content-Type, Accept", 'Authorization']
    }));
    app.use(morgan('dev', {
        skip: function (req, res) {
            return res.statusCode < 400
        },
        stream: process.stderr
    }));

    app.use(morgan('dev', {
        skip: function (req, res) {
            return res.statusCode >= 400
        },
        stream: process.stdout
    }));
    app.use(morgan('common', {
        stream: {
            write: function (message) {
                logger.debug(message);
            }
        }
    }));
    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.json({type: 'application/vnd.api+json'}));
    app.use(bodyParser.urlencoded({'extended': 'true'}));
    app.use(cookieParser());
    app.use(methodOverride('X-HTTP-Method-Override'));
    app.use(favicon(path.join(__dirname, '/../public', 'favicon.ico')));
    app.use('/public', express.static(__dirname + '/../public'));
    app.use('/api', express.static(__dirname + '/../apidoc'));
    app.set('view engine', 'ejs');
    app.use(session({
        secret: 'ilovescotchscotchyscotchscotch',
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
};