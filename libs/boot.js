'use strict';
const logger = require('./logger.js');
const https = require('https');
const http = require('http');
const fs = require('fs');

module.exports = function (app) {
    if (process.env.NODE_ENV !== 'test') {
        const port = app.get('portHttps');
        const credential = {
            key: fs.readFileSync('private.key', 'utf8'),
            cert: fs.readFileSync('public.crt', 'utf8'),
            requestCert: false,
            rejectUnauthorized: false
        };
        https.createServer(credential, app)
            .listen(port, function () {
                logger.info('App listening on port ' + port);
            });
    } else {
        const port = app.get('portHttp');
        http.createServer(app)
            .listen(port, function () {
                logger.info('App listening on port ' + port);
            });
    }
};
