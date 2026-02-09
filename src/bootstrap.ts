import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Express } from 'express';
import { AppModule } from './app.module';

export async function createApp(server?: Express) {
  const expressServer = server ?? express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressServer));
  await app.init();
  return expressServer;
}
