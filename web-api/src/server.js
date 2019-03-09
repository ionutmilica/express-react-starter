const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
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
    CACHE_HOST,
    CACHE_PORT,
    APP_SECRET,
  } = process.env;
  const app = express();

  if (env === 'development') {
    app.use(morgan('dev'));
  }

  const redisClient = redis.createClient({
    host: CACHE_HOST,
    port: CACHE_PORT,
  });

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

  app.use(
    session({
      secret: APP_SECRET || 'dev',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
      store: new redisStore({ client: redisClient, ttl: 86400 }),
    }),
  );
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(makeRoutes(context));

  const server = app.listen(APP_PORT, () =>
    logger.info('App started on port: %d', APP_PORT),
  );

  return { server, logger, db };
}

module.exports = makeServer;
