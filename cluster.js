'use strict';
const cluster = require('cluster');
const os = require('os');
const logger = require('winston');

const CPUS = os.cpus();

if (cluster.isMaster) {
    CPUS.forEach(() => cluster.fork());
    cluster.on('listening', function(worker) {
        logger.info('Cluster %d connected', worker.process.pid);
    });
    cluster.on('disconnect', function(worker) {
        logger.warn('Cluster %d disconnected', worker.process.pid);
    });
    cluster.on('exit', function(worker) {
        logger.warn('Cluster %d is dead', worker.process.pid);
        cluster.fork();
    });
} else {
    require('./server.js');
}
