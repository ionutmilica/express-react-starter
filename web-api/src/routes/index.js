const AsyncRouter = require('express-promise-router');

function makeRoutes({ logger }) {
  const router = AsyncRouter();

  router.get('/', (req, res) => {
    res.send('<h1>Homepage</h1>');
  });
  router.get('/health', (req, res) => res.send('OK'));

  logger.debug('Routes loaded');

  return router;
}

module.exports = makeRoutes;
