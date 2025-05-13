# 🐝 Beefree SDK Integration with HTML Import

This project demonstrates how to integrate Beefree SDK email builder SDK with a custom HTML import feature, including a TypeScript proxy server to handle CORS issues and HTML sanitization.

## 🌟 Features

- Beefree SDK email builder integration
- HTML import functionality with content sanitization
- TypeScript for better code quality and maintenance
- Server-side proxy for API requests
- Template loading and saving
- Security-focused HTML processing

## 🛠️ Setup Instructions

### 1. Prerequisites

- Node.js (v14+ recommended)
- npm (comes with Node.js)
- Basic terminal knowledge
- Code editor (VS Code recommended)

### 2. Project Structure

```
html-importer-spotlight/
├── public/               # Static assets
│   ├── index.html        # Main application HTML
│   └── template.json     # Sample BeeFree template
├── src/                  # TypeScript source files
│   ├── api/              # API controllers and routes
│   │   ├── html-import.controller.ts  # HTML import controller
│   │   ├── html-import.routes.ts      # Route definitions
│   │   └── index.ts                   # API barrel exports
│   ├── config/           # Configuration
│   │   ├── app-config.ts # Application configuration
│   │   └── index.ts      # Config barrel exports
│   ├── services/         # Service implementations
│   │   ├── bee-api.service.ts  # BeeFree API service
│   │   └── index.ts            # Services barrel exports
│   ├── types/            # TypeScript type definitions
│   │   ├── bee-api.types.ts   # BeeFree API type definitions
│   │   └── index.ts           # Types barrel exports
│   ├── utils/            # Utility functions
│   │   ├── html-sanitizer.ts  # HTML sanitization utilities
│   │   └── index.ts           # Utils barrel exports
│   ├── index.ts          # Main application entry point
│   └── server.ts         # Express server setup
├── dist/                 # Compiled JavaScript (generated)
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── .env.example          # Example environment variables
```

### 3. Installation

1. **Clone the repository**:
   ```bash
   git clone git@github.com:LFil89/html-importer-spotlight.git
   cd html-importer-spotlight
   ```

2. **Install dependencies and set up environment**:
   ```bash
   # This will install all dependencies and create the environment file
   npm run setup
   
   # Then edit the .env file with your API credentials
   ```

3. **Build the TypeScript code**:
   ```bash
   npm run build
   ```

### 4. Running the Application

1. **Production mode**:
   ```bash
   # Build the TypeScript files
   npm run build
   
   # Run the compiled JavaScript version
   npm start
   ```

2. **Development mode** (with auto-reload):
   ```bash
   # Run the TypeScript version directly with hot reloading
   npm run dev
   ```

3. **Access the application**:
   Open your browser to:
   ```
   http://localhost:3001
   ```

### 5. TypeScript Implementation

#### Key Components

- **API Layer** (`/src/api/`): Controllers and routes that handle HTTP requests
- **Services Layer** (`/src/services/`): Business logic and external API interactions
- **Utils** (`/src/utils/`): Utility functions and helpers
- **Config** (`/src/config/`): Application configuration management
- **Types** (`/src/types/`): TypeScript type definitions

#### Development Commands

```bash
# Build the TypeScript files
npm run build

# Run TypeScript directly with hot reloading
npm run dev

# Run with debugging support
npm run dev:debug
```

## 🔒 Security

### HTML Sanitization

The TypeScript implementation includes comprehensive HTML sanitization to protect against security threats:

- **Script Removal**: All `<script>` tags are automatically removed
- **Iframe Removal**: All `<iframe>` tags that could load external content are stripped
- **Event Handler Sanitization**: Removes potentially harmful event handlers like `onclick`, `onload`, etc.
- **URL Sanitization**: Removes `javascript:` and dangerous `data:` URLs
- **Size Limits**: Enforces maximum content size to prevent DoS attacks

## 🔧 How It Works

### Frontend (index.html)

1. **Beefree SDK Integration**:
   - Loads Beefree SDK from
   - Initializes the editor with a basic configuration
   - Handles template loading and saving

2. **HTML Import Feature**:
   - Click "Import HTML" button to open modal
   - Paste HTML content into textarea
   - Click "Import" to convert HTML to Beefree SDK template
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
   - Implements reasonable size limits (10MB for requests)

2. **CORS Handling**:
   - Uses `cors` middleware
   - Restricts requests to localhost origin

3. **Static File Serving**:
   - Serves your `index.html` and other assets

4. **Size Limitations**:
   - 10MB limit for HTML files
   - User warnings for files over 5MB
   - Error handling for oversized content

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