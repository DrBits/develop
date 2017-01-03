const cluster = require('cluster');

const CPUCount = require('os').cpus().length;

const Logger = require('../logger');
const logger = new Logger();

cluster.on('disconnect', (worker, code, signal) => {
  logger.log(`Worker ${worker.id} died`);

  cluster.fork();
});

cluster.on('online', (worker) => {
  logger.log(`Worker ${worker.id} running`);
});

for (var i = 0; i < CPUCount; ++i) {
  cluster.fork();
}
