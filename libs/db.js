'use strict';
const logger = require('winston');
const models = require('./../app/models');

module.exports = function () {
    models.sequelize.sync().then(function () {
        logger.info('Database successfully run');
    }).catch(function (err) {
        logger.error(err, 'Something went wrong with the Database Update!');
    });
};
