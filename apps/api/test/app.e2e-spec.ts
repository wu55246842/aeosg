import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('App (e2e)', () => {
  let app: INestApplication;

  const db: any = { users: [], orgs: [], members: [], sites: [], pages: [], llms: [], schemas: [], audits: [] };
  const prismaMock: any = {
    $connect: jest.fn(),
    user: { create: jest.fn(async ({ data }) => ({ id: 'u1', ...data })), findUnique: jest.fn(async ({ where }) => ({ id: 'u1', email: where.email, passwordHash: '$2a$10$E4Q6ThB2kE9nSZ0wP4Yv2u4aSko3L4H2Rn0l95eTHf7P2MS3iEJx2', name: 'Test' })) },
    orgMember: { findMany: jest.fn(async () => []), create: jest.fn(async ({ data }) => ({ id: 'm1', ...data })), update: jest.fn(async ({ data }) => ({ id: 'm1', ...data })) },
    org: { create: jest.fn(async ({ data }) => ({ id: 'o1', ...data })) },
    site: {
      findMany: jest.fn(async () => db.sites),
      create: jest.fn(async ({ data }) => { const s = { id: 's1', status: 'draft', ...data }; db.sites = [s]; return s; }),
      findUniqueOrThrow: jest.fn(async () => db.sites[0]),
      update: jest.fn(async ({ data }) => ({ ...db.sites[0], ...data }))
    },
    page: {
      findMany: jest.fn(async () => db.pages),
      create: jest.fn(async ({ data }) => { const p = { id: 'p1', isIndexable: true, ...data }; db.pages = [p]; return p; }),
      findUniqueOrThrow: jest.fn(async () => db.pages[0]),
      findUnique: jest.fn(async () => db.pages[0]),
      update: jest.fn(async ({ data }) => ({ ...db.pages[0], ...data }))
    },
    pageRevision: { findFirst: jest.fn(async () => ({ version: 1 })), create: jest.fn(async () => ({})) },
    faqItem: { create: jest.fn(async ({ data }) => ({ id: 'f1', ...data })) },
    llmsTxtSnapshot: { create: jest.fn(async ({ data }) => ({ id: 'l1', ...data })), findFirst: jest.fn(async () => ({ content: '# site' })) },
    schemaSnapshot: { create: jest.fn(async () => ({})), findFirst: jest.fn(async () => ({ schemaTypesJson: ['WebPage'] })) },
    audit: { create: jest.fn(async () => ({ id: 'a1', score: 88 })), findFirst: jest.fn(async () => ({ id: 'a1', score: 88 })) },
    citation: { create: jest.fn(async ({ data }) => data), findMany: jest.fn(async () => []) }
  };

  beforeAll(async () => {
    process.env.JWT_ACCESS_SECRET = 'a'; process.env.JWT_REFRESH_SECRET = 'b'; process.env.JWT_ACCESS_TTL = '900'; process.env.JWT_REFRESH_TTL = '604800'; process.env.DATABASE_URL = 'postgres://x'; process.env.CRON_SECRET = 'cron';
    const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  it('/api/health (GET)', async () => {
    await request(app.getHttpServer()).get('/api/health').expect(200);
  });

  it('workflow basic', async () => {
    const token = 'Bearer ' + (await request(app.getHttpServer()).post('/api/auth/register').send({ email: 'a@b.com', password: 'password123', name: 'Test' })).body.data.accessToken;
    await request(app.getHttpServer()).post('/api/sites').set('Authorization', token).send({ orgId: 'o1', name: 'Site', slug: 'site' }).expect(201);
    await request(app.getHttpServer()).post('/api/sites/s1/pages').set('Authorization', token).send({ path: '/', title: 'Home', contentMd: '# Hello\nWhat is AEO?' }).expect(201);
    await request(app.getHttpServer()).post('/api/sites/s1/publish').set('Authorization', token).expect(201);
    await request(app.getHttpServer()).get('/api/sites/s1/aeo/llms.txt').set('Authorization', token).expect(200);
    await request(app.getHttpServer()).get('/api/mcp').expect(200);
  });
});
