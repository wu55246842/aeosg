import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { OrgsModule } from './orgs/orgs.module';
import { SitesModule } from './sites/sites.module';
import { PagesModule } from './pages/pages.module';
import { RenderModule } from './render/render.module';
import { SchemaEngineModule } from './schema/schema.module';
import { AeoModule } from './aeo/aeo.module';
import { AuditModule } from './audit/audit.module';
import { McpModule } from './mcp/mcp.module';
import { CronModule } from './cron/cron.module';
import { HealthModule } from './health/health.module';
import { BillingModule } from './billing/billing.module';
import { CitationsModule } from './citations/citations.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().default('development'),
        PORT: Joi.number().default(3000),
        DATABASE_URL: Joi.string().required(),
        JWT_ACCESS_SECRET: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        JWT_ACCESS_TTL: Joi.number().default(900),
        JWT_REFRESH_TTL: Joi.number().default(604800),
        CRON_SECRET: Joi.string().required()
      })
    }),
    PrismaModule,
    AuthModule,
    OrgsModule,
    SitesModule,
    PagesModule,
    RenderModule,
    SchemaEngineModule,
    AeoModule,
    AuditModule,
    McpModule,
    CronModule,
    HealthModule,
    BillingModule,
    CitationsModule,
    JobsModule
  ]
})
export class AppModule {}
