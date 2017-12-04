const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const path = require('path');
const logger = require('./logger.js');

const portHttp = process.env.PORT_HTTP || 8080;
const portHttps = process.env.PORT_HTTPS || 8081;

module.exports = function (app) {
    app.set('portHttp', portHttp);
    app.set('portHttps', portHttps);
    app.use(helmet());
    app.use(cors({
        origin: ['http://localhost:' + portHttps],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    app.use(morgan('dev', {
        skip: function (req, res) {
            return res.statusCode < 400
        }, stream: process.stderr
    }));

    app.use(morgan('dev', {
        skip: function (req, res) {
            return res.statusCode >= 400
        }, stream: process.stdout
    }));
    app.use(compression());
    app.use(bodyParser.urlencoded({'extended': 'true'}));
    app.use(bodyParser.json({type: 'application/vnd.api+json'}));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(methodOverride('X-HTTP-Method-Override'));
    // app.use(app.auth.initialize());
    app.use(favicon(path.join(__dirname, '/../public', 'favicon.ico')));
    app.use(express.static(__dirname + '/../public'));
    app.use('/api', express.static(__dirname + '/../apidoc'));
    app.use(function (req, res, next) {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        logger.debug('Client IP:', ip);
        next();
    });
};