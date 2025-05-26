import express from 'express';
import { HtmlImportController } from './api/htmlImport.controller';
import { CredentialsController } from './api/credentials.controller';
import { BrandStyleController } from './api/brandStyle.controller';

const router = express.Router();

router.post('/html-to-json', HtmlImportController.convertHtmlToJson);
router.post('/auth', CredentialsController.authenticate);
router.post('/brand-style', BrandStyleController.applyBrandStyle);

export default router;
