# AEO SG NestJS Landing Page

NestJS application with a Vercel-friendly serverless entry and a static homepage.

## Local development

```bash
npm install
npm run start:dev
```

Open `http://localhost:3000`.

Health check endpoint:

- `GET /api/health`

## Build

```bash
npm run build
npm run start
```

## Vercel deployment

This repo includes `vercel.json` routing all traffic to `api/index.ts`, which boots NestJS once per runtime and serves:

- static homepage from `public/index.html`
- NestJS API routes under `/api/*`
