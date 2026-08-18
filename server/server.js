const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();

app.use(cors());
app.use(express.json());

// Example API endpoint
app.get('/api/health', async(req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ status: 'Database is running smoothly!', time:result.rows[0].now });
} catch (err){
    console.error(err.message);
    res.status(500).json({status:'DB server error'});
  }
});

// Use DigitalOcean's dynamic port or default to 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
