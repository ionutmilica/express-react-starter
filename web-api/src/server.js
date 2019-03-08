const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const makeDI = require('./di');
const makeLogger = require('./lib/logger');
const makeRoutes = require('./routes');
const { connect, ping } = require('./lib/db');

async function checkConnection({ db, logger }) {
  try {
    await ping(db);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}

async function makeServer() {
  const {
    NODE_ENV: env = 'development',
    APP_PORT = '8080',
    DB_DRIVER: driver,
    DB_HOST: host,
    DB_PORT: port,
    DB_USERNAME: username,
    DB_PASSWORD: password,
    DB_NAME: database,
  } = process.env;
  const app = express();

  if (env === 'development') {
    app.use(morgan('dev'));
  }

  const logger = makeLogger(env);
  const db = connect({
    driver,
    host,
    port,
    username,
    password,
    database,
  });

  await checkConnection({ db, logger });

  const context = makeDI({
    logger,
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(makeRoutes(context));

  const server = app.listen(APP_PORT, () =>
    logger.info('App started on port: %d', APP_PORT),
  );

  return { server, logger, db };
}

module.exports = makeServer;
