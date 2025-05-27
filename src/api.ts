import { Request, Response } from 'express';
import express from 'express';
import axios, { AxiosError, AxiosResponse } from 'axios';
import config from './config';
import { HtmlSanitizer } from './utils';
import { brandStyle } from './resources/brandStyle';

export interface BeeTemplateObject {
  page: {
    title: string;
    description?: string;
    template?: { name?: string; type?: string; };
    body: { rows: any[]; container?: { style?: any; }; };
    metadata?: { [key: string]: any; };
  };
}

export type BeeTemplate = BeeTemplateObject | string;

export interface ApiResponse {
  error?: string;
  details?: string;
  status?: string;
  message?: string;
  json?: any;
}

const BeeApi = {
  async convertHtmlToJson(html: string): Promise<any> {
    try {
      const response = await axios.post(
        'https://api.getbee.io/v1/conversion/html-to-json',
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
          const errorData = axiosError.response.data as any;
          throw new Error(errorData.message || errorData.details || axiosError.message);
        }
      }
      throw new Error(`BeeFree API Error: ${(error as Error).message}`);
    }
  },

  async applyBrandStyles(template: BeeTemplate): Promise<any> {
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
      
      const response = await axios.post(
        'https://api.getbee.io/v1/template/brand',
        {
          styles: brandStyle,
          template: parsedTemplate
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.CSAPIApiKey}`
          }
        }
      );
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          // No changes needed for template (status code 422)
          if (axiosError.response.status === 422) {
            return { 
              status: 'unchanged',
              message: 'No changes were needed for this template',
              json: parsedTemplate
            };
          }
          
          const errorData = axiosError.response.data as any;
          throw new Error(errorData.message || errorData.details || axiosError.message);
        }
      }
      throw new Error(`BeeFree API Error: ${(error as Error).message}`);
    }
  }
};

const apiHandlers = {
  async authenticate(req: Request, res: Response): Promise<void> {
    try {
      if (!config.beeClientId || !config.beeClientSecret) {
        res.status(500).json({
          error: 'Configuration Error',
          details: 'BeeFree credentials are not configured on the server'
        });
        return;
      }

      const response = await fetch('https://auth.getbee.io/apiauth', {
        method: 'POST',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=password&client_id=${config.beeClientId}&client_secret=${config.beeClientSecret}`
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const token = await response.json();
      res.json(token);
    } catch (error) {
      console.error('Authentication error:', error);
      res.status(500).json({
        error: 'Authentication Error',
        details: 'Failed to authenticate with BeeFree API'
      });
    }
  },

  async convertHtmlToJson(req: Request, res: Response): Promise<void> {
    try {
      const htmlContent = req.body;
      
      if (!htmlContent || typeof htmlContent !== 'string') {
        res.status(400).json({ 
          error: 'Invalid HTML content',
          details: 'The provided content is not valid HTML text'
        });
        return;
      }
      
      if (htmlContent.length > config.maxSizeBytes) {
        res.status(413).json({ 
          error: 'HTML content too large',
          details: `Maximum allowed size is ${config.maxSizeBytes / (1024 * 1024)}MB`
        });
        return;
      }
      
      const sanitizedHtml = HtmlSanitizer.sanitize(htmlContent);
      const result = await BeeApi.convertHtmlToJson(sanitizedHtml.content);
      
      res.json(result);
    } catch (error) {
      res.status(500).json({ 
        error: 'HTML conversion failed',
        details: (error as Error).message
      });
    }
  },

  async applyBrandStyle(req: Request, res: Response): Promise<void> {
    try {
      if (!brandStyle) {
        res.status(400).json({
          error: 'Invalid content defaults',
          details: 'No content defaults provided'
        });
        return;
      }

      const result = await BeeApi.applyBrandStyles(req.body);
      
      res.json(result);
    } catch (error) {
      res.status(500).json({
        error: 'Failed to apply brand styles',
        details: (error as Error).message
      });
    }
  }
};

const router = express.Router();
router.post('/html-to-json', apiHandlers.convertHtmlToJson);
router.post('/auth', apiHandlers.authenticate);
router.post('/brand-style', apiHandlers.applyBrandStyle);

export default router;
