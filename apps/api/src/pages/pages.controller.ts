import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PagesService } from './pages.service';
import { CreatePageDto, UpdatePageDto } from './dto/page.dto';

@UseGuards(JwtAuthGuard)
@Controller('sites/:siteId/pages')
export class PagesController {
  constructor(private readonly pages: PagesService) {}
  @Get() list(@Param('siteId') siteId: string) { return this.pages.list(siteId); }
  @Post() create(@Param('siteId') siteId: string, @Body() dto: CreatePageDto) { return this.pages.create(siteId, dto); }
  @Get(':pageId') get(@Param('pageId') pageId: string) { return this.pages.get(pageId); }
  @Patch(':pageId') update(@Param('pageId') pageId: string, @Body() dto: UpdatePageDto) { return this.pages.update(pageId, dto); }
  @Post(':pageId/publish') publish(@Param('pageId') pageId: string) { return this.pages.publish(pageId); }
}
