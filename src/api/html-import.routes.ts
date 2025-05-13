import express from 'express';
import { HtmlImportController } from './html-import.controller';

const router = express.Router();

router.post('/html-to-json', HtmlImportController.convertHtmlToJson);

export default router;
