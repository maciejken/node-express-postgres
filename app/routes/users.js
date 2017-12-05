'use strict';
const User = require('../models/user');
const logger = require('../../libs/logger.js');

module.exports = function (app) {
    /**
     * @api {get} /api/setup Create sample admin user
     * @apiGroup Users
     * @apiSuccess {String} status API Users' message
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {"success": true}
     **/
    app.get('/api/setup', function (req, res) {
        const sampleUser = new User({
            name: 'Michal Pietrzak',
            password: 'admin123',
            admin: true
        });

        sampleUser.save(function (err) {
            if (err) {
                res.send(err);
            }

            logger.info('User saved successfully');
            res.json({success: true});
        });
    });

    /**
     * @api {get} /api/users Get users
     * @apiName GetUsers
     * @apiGroup Users
     * @apiSuccess {Object} users List of users
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [{"id": "1","name":"Michal Pietrzak", "password":"admin123", "admin":true}]
     **/
    app.get('/api/users', function (req, res) {
        User.find(function (err, todos) {
            if (err) {
                res.send(err);
            }
            res.json(todos);
        });
    });
};
