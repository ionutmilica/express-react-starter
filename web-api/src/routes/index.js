const AsyncRouter = require('express-promise-router');

function makeRoutes({ logger }) {
  const router = AsyncRouter();

  logger.debug('Routes will be loaded');
  router.get('/health', (req, res) => res.send('OK'));
  logger.debug('Routes loaded');

  return router;
}

module.exports = makeRoutes;
