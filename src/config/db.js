const { Pool } = require('pg');

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = process.env
const pool = new Pool({
  connectionString: `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}`,
});

module.exports = pool;
