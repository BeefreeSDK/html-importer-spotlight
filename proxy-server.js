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

function sanitizeHtml(html) {
  if (typeof html !== 'string') {
    return '';
  }
  
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  html = html.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
  
  html = html.replace(/javascript:[^\s"']+/gi, '');
  
  return html;
}

app.post('/proxy/html-to-json', async (req, res) => {
  try {
    const htmlContent = req.body;
    if (!htmlContent || typeof htmlContent !== 'string') {
      return res.status(400).json({ error: 'Invalid HTML content' });
    }
    
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB limit
    if (htmlContent.length > MAX_SIZE) {
      return res.status(413).json({ error: 'HTML content too large (max 10MB)' });
    }
    
    const sanitizedHtml = sanitizeHtml(htmlContent);
    
    const response = await axios.post(
      'https://api.getbee.io/v1/conversion/html-to-json',
      sanitizedHtml,
      {
        headers: {
          'Content-Type': 'text/html',
          'Authorization': 'Bearer c11886faf2aebcee7b6c9d8bec5073bff34d641dc72ebc3b65e0bbbe8b02a259'
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Proxy error:', error.message);
    
    if (error.response) {
      return res.status(error.response.status).json({ 
        error: 'API error: ' + (error.response.data.message || error.message) 
      });
    }
    
    res.status(500).json({ error: 'Failed to convert HTML to JSON' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
  console.log(`Access your HTML file at http://localhost:${PORT}/index.html`);
});