export interface AppConfig {
  port: number;
  apiUrl: string;
  apiKey?: string;
  maxSizeBytes: number;
}

const config: AppConfig = {
  port: Number(process.env.PORT) || 3001,
  apiUrl: process.env.BEE_API_URL || 'https://api.getbee.io/v1/conversion/html-to-json',
  apiKey: process.env.BEE_API_KEY,
  maxSizeBytes: 10 * 1024 * 1024, // 10MB default
};

export default config;
