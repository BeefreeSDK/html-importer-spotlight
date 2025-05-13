import express from 'express';
import cors from 'cors';
import path from 'path';
import config from './config/app-config';
import htmlImportRoutes from './api/html-import.routes';

const app = express();

app.use(cors(
    {
        origin: 'localhost:3001',
        methods: ['GET', 'POST'],
    }
));

app.use(express.text({ 
  type: 'text/html',
  limit: config.maxSizeBytes
}));

app.use(express.static(path.join(__dirname, '../public')));

app.use('/proxy', htmlImportRoutes);

app.listen(config.port, () => {
  console.log(`Server started successfully`, { port: config.port });
  console.log(`Server running on http://localhost:${config.port}`);
  console.log(`Access the HTML importer at http://localhost:${config.port}`);
});

process.on('SIGINT', () => {
  console.log('Received shutdown signal');
  console.log('Shutting down server gracefully...');
  process.exit(0);
});

process.on('uncaughtException', (error) => {
  console.error(`Uncaught exception: ${error.message}`, { stack: error.stack });
  process.exit(1);
});

process.on('unhandledRejection', (reason, _promise) => {
  console.error(`Unhandled promise rejection`, { reason });
});

export default app;
