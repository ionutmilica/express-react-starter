const winston = require('winston');

function makeLogger(env) {
  return winston.createLogger({
    level: env === 'development' ? 'silly' : 'warn',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.splat(),
      winston.format.timestamp(),
      winston.format.printf(
        info => `${info.timestamp} ${info.level}: ${info.message}`,
      ),
    ),
    transports: [new winston.transports.Console()],
  });
}

module.exports = makeLogger;
