import express from 'express';
import cors from 'cors';
import path from 'path';
import config from './config';
import apiRoutes from './api';

const app = express();

app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST'],
}));

app.use(express.text({ 
  type: 'text/html',
  limit: config.maxSizeBytes
}));

app.use(express.json({
  limit: config.maxSizeBytes
}));

app.use(express.static(path.join(__dirname, '../public')));

app.use('/proxy', apiRoutes);

app.listen(config.port, () => {
  console.log(`---------------------------------------------`);
  console.log(`🐝 Beefree HTML Importer Demo Server`);
  console.log(`---------------------------------------------`);
  console.log(`Server running on http://localhost:${config.port}`);
  console.log(`Open the above URL in your browser to start`);
  console.log(`---------------------------------------------`);
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
