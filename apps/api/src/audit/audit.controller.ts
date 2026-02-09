import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuditService } from './audit.service';

@UseGuards(JwtAuthGuard)
@Controller('sites/:siteId/audit')
export class AuditController {
  constructor(private readonly audit: AuditService) {}
  @Post('run') run(@Param('siteId') siteId: string) { return this.audit.run(siteId); }
  @Get('latest') latest(@Param('siteId') siteId: string) { return this.audit.latestSite(siteId); }
  @Get('pages/:pageId/latest') latestPage(@Param('siteId') siteId: string, @Param('pageId') pageId: string) { return this.audit.latestPage(siteId, pageId); }
}
