const knex = require('knex');

function connect({ driver, host, port, username, password, database }) {
  return knex({
    client: driver,
    connection: {
      host: host,
      port: parseInt(port, 10),
      user: username,
      password: password,
      database: database,
    },
    pool: {
      min: 2,
      max: 10,
    },
  });
}

async function ping(db) {
  return db.raw('SELECT 1;');
}

module.exports = {
  connect,
  ping,
};
