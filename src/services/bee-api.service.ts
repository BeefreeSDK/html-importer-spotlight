import axios, { AxiosError, AxiosResponse } from 'axios';
import { HtmlConversionResponse } from '../types/bee-api.types';
import config from '../config/app-config';

export class BeeApiService {
  public static async convertHtmlToJson(html: string): Promise<HtmlConversionResponse> {
    try {
      const response: AxiosResponse<HtmlConversionResponse> = await axios.post(
        config.apiUrl,
        html,
        {
          headers: {
            'Content-Type': 'text/html',
            'Authorization': `Bearer ${config.HTMLImporterApiKey}`
          },
          maxContentLength: Infinity,
          maxBodyLength: Infinity
        }
      );
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          const errorMessage = axiosError.response.data as any;
          throw new Error(`BeeFree API Error: ${errorMessage.message || axiosError.message}`);
        }
      }
      
      throw new Error(`BeeFree API Error: ${(error as Error).message}`);
    }
  }
}
