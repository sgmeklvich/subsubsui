// server/db.js
const { Pool } = require('pg');

// DigitalOcean provides DATABASE_URL. Locally, you can use a .env file.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Required for many cloud databases (like DigitalOcean) to handle SSL securely
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

module.exports = pool;
