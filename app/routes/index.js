const path = require('path');
const logger = require('../../logger.js');

module.exports = function (app) {
    /**
     * @api {get} / API Status
     * @apiGroup Status
     * @apiSuccess {String} status API Status' message
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {"status": "Ok"}
     **/
    app.get('/', function (req, res) {
        res.json({status: 'Ok'});
    });

    // app.get('/api', function (req, res) {;
    //     // res.sendFile('index.html', {root: path.resolve('./apidoc')});
    //     res.sendFile(path.resolve('./apidoc') + '/index.html');
    // });
    //
    // app.get('*', function (req, res) {
    //     res.sendFile(__dirname + '/public/index.html');
    // });

    app.use(function (req, res, next) {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        logger.debug('Client IP:', ip);
        next();
    });
};