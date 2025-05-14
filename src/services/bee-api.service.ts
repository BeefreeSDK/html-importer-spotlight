import axios, { AxiosError, AxiosResponse } from 'axios';
import config from '../config/app-config';
import { BeeTemplate, HtmlConversionResponse } from '../types/bee-api.types';
import { brandStyle } from '../resources/brandStyle';

export class BeeApiService {
  public static async convertHtmlToJson(html: string): Promise<HtmlConversionResponse> {
    try {
      const response: AxiosResponse<HtmlConversionResponse> = await axios.post(
        config.htmlImporterUrl,
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

  public static async applyBrandStyles(template: BeeTemplate): Promise<any> {
    try {
      const response: AxiosResponse = await axios.post(
        config.brandStyleUrl,
        {
          styles: brandStyle,
          template
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.CSAPIApiKey}`
          }
        },
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          const errorMessage = axiosError.response.data as any;
          throw new Error(`BeeFree Brand Style API Error: ${errorMessage.message || axiosError.message}`);
        }
      }

      throw new Error(`BeeFree Brand Style API Error: ${(error as Error).message}`);
    }
  }
}
