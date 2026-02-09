import { Module } from '@nestjs/common';
import { CronController } from './cron.controller';
import { AuditModule } from '../audit/audit.module';
@Module({ imports: [AuditModule], controllers: [CronController] })
export class CronModule {}
