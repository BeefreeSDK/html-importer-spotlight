import express from 'express';
import { BrandStyleController, CredentialsController, HtmlImportController } from './api';

const router = express.Router();

router.post('/html-to-json', HtmlImportController.convertHtmlToJson);
router.get('/credentials', CredentialsController.getCredentials);
router.post('/brand-style', BrandStyleController.applyBrandStyle);

export default router;
