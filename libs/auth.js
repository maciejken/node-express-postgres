const User = require('../app/models/user');
const jwt    = require('jsonwebtoken');

module.exports = function (app) {
    const cfg = app.config.config;

    app.post('/authenticate', function (req, res) {
        User.findOne({
            name: req.body.name
        }, function (err, user) {
            if (err) {
                throw err;
            }

            if (!user) {
                res.json({success: false, message: 'Authentication failed. User not found.'});
            } else if (user) {
                // check if password matches
                if (user.password !== req.body.password) {
                    res.json({success: false, message: 'Authentication failed. Wrong password.'});
                } else {
                    // if user is found and password is right
                    // create a token with only our given payload
                    // we don't want to pass in the entire user since that has the password
                    const payload = {
                        admin: user.admin
                    };
                    const token = jwt.sign(payload, cfg.jwtSecret, {
                        expiresIn: "24h"
                    });

                    res.json({
                        success: true,
                        message: 'Successfully authenticated!',
                        token: token
                    });
                }
            }
        });
    });

    app.use(function(req, res, next) {
        // check header or url parameters or post parameters for token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, cfg.jwtSecret, function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    });
};