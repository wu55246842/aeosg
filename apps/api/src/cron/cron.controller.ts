import { Controller, Headers, Post, UnauthorizedException } from '@nestjs/common';
import { AuditService } from '../audit/audit.service';

@Controller('cron')
export class CronController {
  constructor(private readonly audit: AuditService) {}
  private validate(secret: string | undefined) { if (secret !== process.env.CRON_SECRET) throw new UnauthorizedException('Invalid cron secret'); }
  @Post('audit-nightly') async auditNightly(@Headers('x-cron-secret') secret?: string) { this.validate(secret); return this.audit.run('all'); }
  @Post('llms-refresh') llms(@Headers('x-cron-secret') secret?: string) { this.validate(secret); return { queued: 'llms-refresh' }; }
  @Post('schema-refresh') schema(@Headers('x-cron-secret') secret?: string) { this.validate(secret); return { queued: 'schema-refresh' }; }
}
