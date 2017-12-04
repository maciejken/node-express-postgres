const mongoose = require('mongoose');
const logger = require('./logger.js');

let db = null;

module.exports = function (app) {
    if(!db) {
        const config = app.config.config;

        mongoose.connect(config.localUrl, {
            useMongoClient: true,
        });

        db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {
            logger.debug("Connected to database: " + config.localUrl);
        });
    }
    return db;
};
