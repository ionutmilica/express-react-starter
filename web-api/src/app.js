const makeServer = require('./server');

(async () => {
  const { server, logger, db } = await makeServer();

  const close = () => {
    server.close(() => {
      logger.info('Http server closed.');
      db.destroy(() => {
        logger.info('Database connection closed.');
        process.exit(0);
      });
    });
  };

  process.on('SIGINT', () => {
    logger.info('Received SIGINT. Shutting down now.');
    close();
  });

  process.on('SIGTERM', () => {
    logger.info('All requests finished. Shutting down now.');
    close();
  });
})();
