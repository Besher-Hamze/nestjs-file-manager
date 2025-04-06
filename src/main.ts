// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as express from 'express';
import { Logger } from '@nestjs/common';

async function bootstrap() {


  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Configure uploads directory
  const UPLOADS_DIR = join(process.cwd(), 'uploads');
  app.use('/public-files', express.static(UPLOADS_DIR));

  const PORT = 3002;
  await app.listen(PORT);

  const logger = new Logger('Bootstrap');
  logger.log(`File storage service running on port ${PORT} (HTTPS)`);
  logger.log(`JWT_SECRET ${process.env.JWT_SECRET ? 'exists' : 'not found'}`);
  logger.log(`CORS enabled for all domains`);
  logger.log(`Uploads directory: ${UPLOADS_DIR}`);
  logger.log(`Files will be publicly accessible at: https://your-server:${PORT}/public-files/path/to/file`);
}
bootstrap();