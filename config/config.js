'use strict';
const logger = require('winston');

module.exports = function() {
    const env = process.env.NODE_ENV;
    if (env) {
        return require('./config.' + env + '.js');
    } else {
        logger.info('NODE_ENV not found. Used "development" by default');
        return require('./config.development.js');
    }
};
