const {
  DB_DRIVER = 'mysql',
  DB_HOST = 'localhost',
  DB_PORT = '3306',
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_POOL_MIN = '2',
  DB_POOL_MAX = '10',
} = process.env;

module.exports = {
  client: DB_DRIVER,
  connection: {
    host: DB_HOST,
    port: parseInt(DB_PORT, 10),
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
  },
  pool: {
    min: parseInt(DB_POOL_MIN, 10),
    max: parseInt(DB_POOL_MAX, 10),
  },
  migrations: {
    directory: `${__dirname}/db/migrations`,
    tableName: 'migrations',
  },
  seeds: {
    directory: `${__dirname}/db/seeds`,
  },
};
