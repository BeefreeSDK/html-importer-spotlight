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
            res.json(result);
        } catch (error) {
            res.status(500).json({
                error: 'Failed to apply brand styles',
                details: (error as Error).message
            } as ApiErrorResponse);
        }
    }
}