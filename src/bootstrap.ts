import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Express } from 'express';
import path from 'path';
import { AppModule } from './app.module';

export async function createApp(server?: Express) {
  const expressServer = server ?? express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressServer));

  const publicPath = path.join(process.cwd(), 'public');
  expressServer.use(express.static(publicPath));
  expressServer.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    return res.sendFile(path.join(publicPath, 'index.html'));
  });

  await app.init();
  return expressServer;
}
