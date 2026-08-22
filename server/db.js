// server/db.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // This bypasses the self-signed certificate error
    ca: process.env.CA_CERT,
  }
});

module.exports = pool;
