import 'reflect-metadata';
import { VercelRequest, VercelResponse } from '@vercel/node';
import serverless from 'serverless-http';
import express from 'express';
import { createApp } from '../src/bootstrap';

let handler: ReturnType<typeof serverless>;
let bootstrapPromise: Promise<ReturnType<typeof serverless>> | undefined;

async function bootstrap() {
  if (handler) {
    return handler;
  }

  if (!bootstrapPromise) {
    bootstrapPromise = (async () => {
      const server = express();
      const app = await createApp(server);
      handler = serverless(app, { provider: 'aws' });
      return handler;
    })();
  }

  return bootstrapPromise;
}

export default async function (req: VercelRequest, res: VercelResponse) {
  const server = await bootstrap();
  return server(req, res);
}
