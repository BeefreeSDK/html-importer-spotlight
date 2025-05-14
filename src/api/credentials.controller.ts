import config from "../config/app-config";
import { Request, Response } from "express";
import { ApiErrorResponse } from "../types";

export class CredentialsController {
    public static async authenticate(req: Request, res: Response): Promise<void> {
        try {
            if (!config.beeClientId || !config.beeClientSecret) {
                res.status(500).json({
                    error: 'Configuration Error',
                    details: 'BeeFree credentials are not configured on the server'
                } as ApiErrorResponse);
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
            } as ApiErrorResponse);
        }
    }
}