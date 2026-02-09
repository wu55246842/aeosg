import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CitationsService } from './citations.service';

@UseGuards(JwtAuthGuard)
@Controller('sites/:siteId/citations')
export class CitationsController {
  constructor(private readonly citations: CitationsService) {}
  @Post() create(@Param('siteId') siteId: string, @Body() body: any) { return this.citations.create(siteId, body); }
  @Get() list(@Param('siteId') siteId: string) { return this.citations.list(siteId); }
}
