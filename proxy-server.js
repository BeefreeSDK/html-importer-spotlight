require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware - No payload size limit (USE WITH CAUTION)
app.use(cors());
app.use(express.text({ 
  type: 'text/html',
  limit: Infinity  // No size limit for incoming requests
}));
app.use(express.static(path.join(__dirname)));

// Proxy endpoint
app.post('/proxy/html-to-json', async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.getbee.io/v1/conversion/html-to-json',
      req.body,
      {
        headers: {
          'Content-Type': 'text/html',
          'Authorization': `Bearer ${process.env.BEEFREE_AUTH_TOKEN}`
        },
        maxContentLength: Infinity,  // No limit for response size
        maxBodyLength: Infinity     // No limit for request size
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(500).json({ error: 'Failed to convert HTML to JSON' });
  }
});

// Auth endpoint to get Beefree token
app.get('/auth/beefree-token', async (req, res) => {
  try {
    const response = await axios.post(
      'https://auth.getbee.io/apiauth',
      `grant_type=password&client_id=${process.env.BEEFREE_CLIENT_ID}&client_secret=${process.env.BEEFREE_CLIENT_SECRET}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Auth error:', error.message);
    res.status(500).json({ error: 'Failed to authenticate with Beefree API' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
  console.log(`Access your HTML file at http://localhost:${PORT}/index.html`);
});