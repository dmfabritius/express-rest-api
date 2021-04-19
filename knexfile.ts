module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './db/auth.sqlite',
    },
    migrations: {
      directory: './db',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './db',
    },
    useNullAsDefault: true,
  },
};
