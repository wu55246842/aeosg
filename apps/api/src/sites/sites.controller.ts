import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SitesService } from './sites.service';
import { CreateSiteDto, UpdateSiteDto } from './dto/site.dto';

@UseGuards(JwtAuthGuard)
@Controller('sites')
export class SitesController {
  constructor(private readonly sites: SitesService) {}
  @Get() list(@Query('orgId') orgId?: string) { return this.sites.list(orgId); }
  @Post() create(@Body() dto: CreateSiteDto) { return this.sites.create(dto); }
  @Get(':siteId') get(@Param('siteId') siteId: string) { return this.sites.get(siteId); }
  @Patch(':siteId') update(@Param('siteId') siteId: string, @Body() dto: UpdateSiteDto) { return this.sites.update(siteId, dto); }
  @Post(':siteId/publish') publish(@Param('siteId') siteId: string) { return this.sites.publish(siteId); }
}
