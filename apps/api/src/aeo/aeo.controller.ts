import { Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AeoService } from './aeo.service';

@UseGuards(JwtAuthGuard)
@Controller('sites/:siteId/aeo')
export class AeoController {
  constructor(private readonly aeo: AeoService) {}
  @Get('llms.txt') llms(@Param('siteId') siteId: string) { return this.aeo.latestLlms(siteId); }
  @Post('llms.txt/regenerate') regenerate(@Param('siteId') siteId: string) { return this.aeo.regenerateLlms(siteId); }
  @Post('faq/generate') faq(@Query('pageId') pageId: string) { return this.aeo.generateFaq(pageId); }
}
