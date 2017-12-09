'use strict';
const cluster = require('cluster');
const os = require('os');
const logger = require('./libs/logger');

const CPUS = os.cpus();
if (cluster.isMaster) {
    CPUS.forEach(() => cluster.fork());
    cluster.on('listening', worker => {
        logger.log('Cluster %d connected', worker.process.pid);
    });
    cluster.on('disconnect', worker => {
        logger.warn('Cluster %d disconnected', worker.process.pid);
    });
    cluster.on('exit', worker => {
        logger.warn('Cluster %d is dead', worker.process.pid);
        cluster.fork();
    })
} else {
    require('./server.js')
}
