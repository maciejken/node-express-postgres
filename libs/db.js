'use strict';
const mongoose = require('mongoose');
const logger = require('./logger.js');

let db = null;

module.exports = function (app) {
    if (!db) {
        const config = app.config.config.database;

        mongoose.connect(config.localUrl, {
            useMongoClient: true,
        });

        db = mongoose.connection;

        // When successfully connected
        db.on('connected', function () {
            logger.info("Successfully connected to Mongodb database at URL: " + config.localUrl);
        });

        // If the connection throws an error
        db.on('error', function (err) {
            logger.error("Mongoose default connection error: " + err);
        });

        // When the connection is disconnected
        db.on('disconnected', function () {
            logger.info('Mongoose default connection disconnected');
        });

        // If the Node process ends, close the Mongoose connection
        process.on('SIGINT', function () {
            db.close(function () {
                logger.info('Mongoose default connection disconnected through app termination');
                process.exit(0);
            });
        });
    }
    return db;
};
