const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Example API endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running smoothly!' });
});

// Use DigitalOcean's dynamic port or default to 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
