const logger = require('./logger.js');

module.exports = function (app) {
    const port = app.get('portHttp');

    app.listen(port, function () {
        logger.debug('App listening on port ' + port);
    });
};
