# 🐝 Beefree HTML Email Importer Demo

A simple demo showcasing Beefree SDK integration with HTML import functionality. This project demonstrates how to import HTML emails into the Beefree editor and apply custom brand styles.

## ✨ Features

- **HTML Import** - Import HTML emails into the Beefree builder
- **Brand Style Application** - Apply consistent branding to imported templates

## 🚀 Quick Start

### Prerequisites

- Node.js (v16+ recommended)
- npm
- Beefree SDK credentials (API keys)

### Setup

1. **Clone and install**

```bash
git clone https://github.com/your-username/html-importer-spotlight.git
cd html-importer-spotlight
npm install
```

2. **Configure environment**

Copy the example environment file and add your API keys:

```bash
cp .env.example .env
# Edit .env with your Beefree credentials
```

3. **Start the development server**

```bash
npm run dev
```

4. **Open in browser**

Open http://localhost:3001 in your browser to use the demo

## 📂 Project Structure

```
html-importer-spotlight/
├── public/                   # Frontend assets
│   ├── index.html            # Main application
│   ├── styles.css            # Application styles
│   └── sample-email.html     # Sample email for import
├── src/                      # Backend code
│   ├── api.ts                # All API endpoints
│   ├── config.ts             # Application configuration
│   ├── index.ts              # App entry point
│   ├── server.ts             # Express server
│   └── utils.ts              # Helper utilities
├── package.json              # Dependencies
└── .env.example              # Example environment variables
```

## 🚀 Running the Application

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

## 🔒 Security

### HTML Sanitization

The TypeScript implementation includes comprehensive HTML sanitization to protect against security threats:

- **Script Removal**: All `<script>` tags are automatically removed
- **Iframe Removal**: All `<iframe>` tags that could load external content are stripped
- **Event Handler Sanitization**: Removes potentially harmful event handlers like `onclick`, `onload`, etc.
- **URL Sanitization**: Removes `javascript:` and dangerous `data:` URLs
- **Size Limits**: Enforces maximum content size to prevent DoS attacks

## 🔒 Security Notes

### Credential Management

This application uses server-side authentication to protect sensitive API credentials:

1. **Never commit `.env` files** to the repository
2. All authentication with the BeeFree API happens server-side
3. The client only receives the necessary tokens, not the underlying credentials
4. Use environment variables for all sensitive information:
   - `BEEFREE_CLIENT_ID`
   - `BEEFREE_CLIENT_SECRET`
   - `HTML_IMPORTER_API_KEY`
   - `CSAPI_API_KEY`