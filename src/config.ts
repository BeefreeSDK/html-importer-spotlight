const config = {
  port: 3001,
  HTMLImporterApiKey: process.env.HTML_IMPORTER_API_KEY,
  maxSizeBytes: 10 * 1024 * 1024, // 10MB default
  beeClientId: process.env.BEEFREE_CLIENT_ID || '',
  beeClientSecret: process.env.BEEFREE_CLIENT_SECRET || '',
  CSAPIApiKey: process.env.CSAPI_API_KEY || ''
};

export default config;
