# 🐝 Beefree SDK Integration with HTML Import

This project demonstrates how to integrate Beefree SDK email builder SDK with a custom HTML import feature, including a proxy server to handle CORS issues.

## 🌟 Features

- Beefree SDK email builder integration
- HTML import functionality with validation
- Server-side proxy for API requests
- Template loading and saving

## 🛠️ Setup Instructions

### 1. Prerequisites

- Node.js (v14+ recommended)
- npm (comes with Node.js)
- Basic terminal knowledge
- Code editor (VS Code recommended)

### 2. Project Structure

```
beefree-sdk-project/
├── index.html            # Frontend application
├── proxy-server.js       # Node.js proxy server
├── package.json          # Node.js dependencies
└── template.json         # Sample template (optional)
```

### 3. Installation

1. **Clone or create project folder**:
   ```bash
   mkdir beefree-project
   cd beefree-project
   ```

2. **Initialize Node.js project**:
   ```bash
   npm init -y
   ```

3. **Install dependencies**:
   ```bash
   npm install express axios cors dotenv
   ```

4. **Set up environment variables**:
   ```bash
   # Copy the example .env file
   npm run create-env
   
   # Then edit the .env file with your API credentials
   ```

### 5. File Setup

1. Create `index.html` with the provided HTML content
2. Create `proxy-server.js` with the provided server code
3. Create `package.json` with the provided configuration

### 5. Running the Application

1. **Start the proxy server** (in one terminal):
   ```bash
   node proxy-server.js
   ```

2. **Access the application**:
   Open your browser to:
   ```
   http://localhost:3001/index.html
   ```

## 🔧 How It Works

### Frontend (index.html)

1. **Beefree SDK Integration**:
   - Loads Beefree SDK from
   - Initializes the editor with a basic configuration
   - Handles template loading and saving

2. **HTML Import Feature**:
   - Click "Import HTML" button to open modal
   - Paste HTML content into textarea
   - Click "Upload" to convert HTML to Beefree SDK template
   - Validation ensures basic HTML structure

3. **Proxy API Call**:
   ```javascript
   fetch('http://localhost:3001/proxy/html-to-json', {
     method: 'POST',
     headers: { 'Content-Type': 'text/html' },
     body: htmlContent
   })
   ```

### Backend (proxy-server.js)

1. **Proxy Endpoint**:
   - Receives HTML from frontend
   - Forwards to HTML Importer API with proper headers
   - Returns converted JSON template

2. **CORS Handling**:
   - Uses `cors` middleware
   - Allows requests from your frontend origin

3. **Static File Serving**:
   - Serves your `index.html` and other assets

### API Flow

1. Frontend → Your Proxy (localhost:3001)
2. Your Proxy → HTML Importer API (api.getbee.io)
3. HTML Importer API → Your Proxy → Frontend

## 🚀 Deployment Notes

For production deployment:

1. Set environment variables for sensitive data (API keys)
2. Configure proper CORS origins
3. Use HTTPS for all connections
4. Consider adding rate limiting

## 🐛 Troubleshooting

1. **CORS Errors**:
   - Ensure proxy server is running
   - Check console for errors

2. **API Failures**:
   - Verify your API key is correct
   - Check proxy server logs

3. **Editor Not Loading**:
   - Verify Beefree SDK is loading
   - Check authentication token request

## 📚 Resources

- [Beefree SDK Documentation](https://beefree.io/beefree-sdk)
- [Express.js Docs](https://expressjs.com/)
- [Axios Docs](https://axios-http.com/)

## 🙏 Credits

This project uses:
- BeeFree SDK for email building
- Express.js for the proxy server
- Axios for API requests