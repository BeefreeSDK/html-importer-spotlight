import config from "../config/app-config";
import { Request, Response } from "express";
import { ApiErrorResponse } from "../types";

export class CredentialsController {
    public static getCredentials(req: Request, res: Response): void {
        if (!config.beeClientId || !config.beeClientSecret) {
            res.status(500).json({
                error: 'Configuration Error',
                details: 'BeeFree credentials are not configured on the server'
            } as ApiErrorResponse);
            return;
        }

        res.json({
            clientId: config.beeClientId,
            clientSecret: config.beeClientSecret
        });
    }
}