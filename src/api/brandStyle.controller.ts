import { brandStyle } from "../resources/brandStyle";
import { Request, Response } from "express";
import { ApiErrorResponse, BeeTemplate } from "../types";
import { BeeApiService } from "../services";

export class BrandStyleController {
    public static async applyBrandStyle(req: Request, res: Response): Promise<void> {
        try {
            if (!brandStyle) {
                res.status(400).json({
                    error: 'Invalid content defaults',
                    details: 'No content defaults provided'
                } as ApiErrorResponse);
                return;
            }

            const result = await BeeApiService.applyBrandStyles(req.body);
            
            if (result && result.status === 'unchanged') {
                res.json({ 
                    status: 'unchanged',
                    message: 'No changes were needed for this template',
                    json: result.json
                });
                return;
            }
            
            res.json(result);
        } catch (error) {
            const errorMessage = (error as Error).message || 'Unknown error';
            const errorDetails = errorMessage.includes('BeeFree Brand Style API Error') 
                ? errorMessage 
                : `Failed to apply brand styles: ${errorMessage}`;
            
            res.status(500).json({
                error: 'Failed to apply brand styles',
                details: errorDetails
            } as ApiErrorResponse);
        }
    }
}