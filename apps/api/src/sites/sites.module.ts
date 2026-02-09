import { Module } from '@nestjs/common';
import { SitesController } from './sites.controller';
import { SitesService } from './sites.service';
import { AeoModule } from '../aeo/aeo.module';
import { AuditModule } from '../audit/audit.module';
import { SchemaEngineModule } from '../schema/schema.module';
@Module({ imports: [AeoModule, AuditModule, SchemaEngineModule], controllers: [SitesController], providers: [SitesService], exports: [SitesService] })
export class SitesModule {}
