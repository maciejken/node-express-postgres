'use strict';
const winston = require("winston");
const fs = require("fs");

const env = process.env.NODE_ENV || 'development';
const level = env === 'development' ? 'debug' : 'info';
const tsFormat = function () {
    return (new Date()).toLocaleTimeString();
};

if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
}

const logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            colorize: true,
            level: level,
            filename: 'logs/server.log',
            maxsize: 1024000,
            maxFiles: 5,
            timestamp: tsFormat
        }),
        new winston.transports.Console({
            colorize: true,
            level: 'info',
            timestamp: tsFormat
        })
    ]
});

module.exports = logger;