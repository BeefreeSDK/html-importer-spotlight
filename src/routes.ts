import express from 'express';
import { HtmlImportController } from './api/htmlImport.controller';
import { BrandStyleController } from './api/brandStyle.controller';

const router = express.Router();

router.post('/html-to-json', HtmlImportController.convertHtmlToJson);
router.post('/brand-style', BrandStyleController.applyBrandStyle);

export default router;
