import 'reflect-metadata';
import { VercelRequest, VercelResponse } from '@vercel/node';
import serverless from 'serverless-http';
import express from 'express';
import { createApp } from '../src/bootstrap';

let handler: ReturnType<typeof serverless>;

async function bootstrap() {
  if (!handler) {
    const server = express();
    const app = await createApp(server);
    handler = serverless(app);
  }
  return handler;
}

export default async function (req: VercelRequest, res: VercelResponse) {
  const server = await bootstrap();
  return server(req, res);
}
