export interface AppConfig {
  port: number;
  apiUrl: string;
  HTMLImporterApiKey?: string;
  maxSizeBytes: number;
  beeClientId?: string;
  beeClientSecret?: string;
}

const config: AppConfig = {
  port: Number(process.env.PORT) || 3001,
  apiUrl: process.env.BEE_API_URL || 'https://api.getbee.io/v1/conversion/html-to-json',
  HTMLImporterApiKey: process.env.HTML_IMPORTER_API_KEY,
  maxSizeBytes: 10 * 1024 * 1024, // 10MB default
  beeClientId: process.env.BEEFREE_CLIENT_ID || '',
  beeClientSecret: process.env.BEEFREE_CLIENT_SECRET || ''
};

export default config;
