require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware configuration
app.use(cors({
  // Restrict CORS to localhost for demo purposes
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST']
}));

app.use(express.text({ 
  type: 'text/html',
  limit: '10mb'  // 10MB limit for incoming HTML requests
}));

app.use(express.static(path.join(__dirname)));

app.post('/proxy/html-to-json', async (req, res) => {
  try {
    let htmlToConvert = req.body;
    const contentType = req.get('Content-Type') || '';
    
    console.log('Original Content-Type:', contentType);
    
    // Safety check - ensure we have something to process
    if (!htmlToConvert) {
      throw new Error('No HTML content received');
    }
    
    // Ensure we have a string
    if (typeof htmlToConvert !== 'string') {
      // Try to convert to string if possible
      try {
        htmlToConvert = String(htmlToConvert);
        console.log('Converted to string');
      } catch (e) {
        throw new Error('Invalid HTML content received - cannot convert to string');
      }
    }
    
    const contentLength = htmlToConvert.length;
    console.log(`Processing HTML conversion request of size: ${(contentLength / 1024).toFixed(2)} KB`);
    console.log('Request body type after processing:', typeof htmlToConvert);
    console.log('Content-Type received:', contentType);
    console.log('Request body starts with:', htmlToConvert.substring(0, 100) + '...');
    
    // For very large requests, warn in logs but still process
    if (contentLength > 5 * 1024 * 1024) { // 5MB
      console.warn(`Warning: Large HTML content (${(contentLength / (1024 * 1024)).toFixed(2)} MB) being processed`);
    }
    
    // Ensure we have valid HTML by checking for basic HTML structure
    if (!htmlToConvert.includes('<html') && !htmlToConvert.includes('<!DOCTYPE')) {
      console.warn('HTML content may not be valid - missing expected HTML tags');
    }
    
    // Remove any UTF-8 BOM if present
    if (htmlToConvert.charCodeAt(0) === 0xFEFF) {
      htmlToConvert = htmlToConvert.substring(1);
      console.log('Removed UTF-8 BOM from HTML content');
    }
    
    const response = await axios({
      method: 'post',
      url: 'https://api.getbee.io/v1/conversion/html-to-json',
      data: htmlToConvert,
      headers: {
        'Content-Type': 'text/html',  // Must be exactly 'text/html'
        'Authorization': `Bearer ${process.env.BEEFREE_AUTH_TOKEN}`
      },
      maxContentLength: 15 * 1024 * 1024, // 15MB limit for response
      maxBodyLength: 10 * 1024 * 1024,    // 10MB limit for request
      timeout: 30000, // 30 second timeout for large conversions
      responseType: 'json'
    });
    
    if (response.data !== null && typeof response.data === 'object') {
      res.json(response.data);
    } else {
      console.error('Unexpected response format:', response.data);
      res.status(500).json({ error: 'Server received an unexpected response format' });
    }
  } catch (error) {
    
    if (error.code === 'ECONNABORTED') {
      console.error('Request timed out - HTML file may be too complex');
      res.status(413).json({ 
        error: 'HTML conversion timed out. Your HTML may be too large or complex.' 
      });
    } else if (error.response && error.response.status === 413) {
      console.error('Payload too large');
      res.status(413).json({ 
        error: 'HTML file is too large. Please try with a smaller file (under 10MB).' 
      });
    } else if (error.message && error.message.includes('maxContentLength')) {
      console.error('Response payload too large');
      res.status(413).json({ 
        error: 'The converted JSON is too large. Please try with a simpler HTML file.' 
      });
    } else {
      res.status(500).json({ error: 'Failed to convert HTML to JSON: ' + error.message });
    }
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