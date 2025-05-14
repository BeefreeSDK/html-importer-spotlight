import { Request, Response } from 'express';
import config from '../config/app-config';
import { BeeApiService } from '../services';
import { ApiErrorResponse } from '../types';
import { HtmlSanitizer } from '../utils';

export class HtmlImportController {
  public static async convertHtmlToJson(req: Request, res: Response): Promise<void> {
    try {
      const htmlContent = req.body;
      
      if (!htmlContent || typeof htmlContent !== 'string') {
        res.status(400).json({ 
          error: 'Invalid HTML content',
          details: 'The provided content is not valid HTML text'
        } as ApiErrorResponse);
        return;
      }
      
      if (htmlContent.length > config.maxSizeBytes) {
        res.status(413).json({ 
          error: 'HTML content too large',
          details: `Maximum allowed size is ${config.maxSizeBytes / (1024 * 1024)}MB`
        } as ApiErrorResponse);
        return;
      }
      
      const sanitizedHtml = HtmlSanitizer.sanitize(htmlContent);
      
      const result = await BeeApiService.convertHtmlToJson(sanitizedHtml.content);
      
      res.json(result);
    } catch (error) {
      res.status(500).json({ 
        error: 'Failed to convert HTML to JSON',
        details: (error as Error).message
      } as ApiErrorResponse);
    }
  }
}
