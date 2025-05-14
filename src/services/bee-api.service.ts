import axios, { AxiosError, AxiosResponse } from 'axios';
import config from '../config/app-config';
import { BeeTemplate, BrandStyleResponse, HtmlConversionResponse } from '../types/bee-api.types';
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
          const errorDetail = errorMessage.message || errorMessage.details || errorMessage.error || axiosError.message;
          throw new Error(`BeeFree HTML Import Error: ${errorDetail}`);
        }
      }

      throw new Error(`BeeFree HTML Import Error: ${(error as Error).message}`);
    }
  }

  public static async applyBrandStyles(template: BeeTemplate | string): Promise<BrandStyleResponse> {
    let parsedTemplate;
    
    try {
      if (typeof template === 'string') {
        try {
          parsedTemplate = JSON.parse(template);
        } catch (e) {
          throw new Error('Invalid template format: JSON parsing failed');
        }
      } else {
        parsedTemplate = template;
      }
      
      const response: AxiosResponse = await axios.post(
        config.brandStyleUrl,
        {
          styles: brandStyle,
          template: parsedTemplate
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
          // Handle 422 status code specially - no changes were made to the template
          if (axiosError.response.status === 422) {
            return { 
              status: 'unchanged',
              message: 'No changes were needed for this template',
              json: parsedTemplate
            };
          }
          
          const errorMessage = axiosError.response.data as any;
          const errorDetail = errorMessage.message || errorMessage.details || errorMessage.error || axiosError.message;
          throw new Error(`BeeFree Brand Style API Error: ${errorDetail}`);
        }
      }

      throw new Error(`BeeFree Brand Style API Error: ${(error as Error).message}`);
    }
  }
}
