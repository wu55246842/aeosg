import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SchemaService } from './schema.service';

@UseGuards(JwtAuthGuard)
@Controller('sites/:siteId/aeo/schema')
export class SchemaController {
  constructor(private readonly schema: SchemaService) {}
  @Get() latest(@Query('pageId') pageId: string) { return this.schema.latest(pageId); }
}
