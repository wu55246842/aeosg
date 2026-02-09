import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AeoService } from '../aeo/aeo.service';
import { AuditService } from '../audit/audit.service';
import { SchemaService } from '../schema/schema.service';
import { CreateSiteDto, UpdateSiteDto } from './dto/site.dto';

@Injectable()
export class SitesService {
  constructor(private readonly prisma: PrismaService, private readonly aeo: AeoService, private readonly audit: AuditService, private readonly schema: SchemaService) {}
  list(orgId?: string) { return this.prisma.site.findMany({ where: orgId ? { orgId } : undefined }); }
  create(dto: CreateSiteDto) { return this.prisma.site.create({ data: dto }); }
  get(siteId: string) { return this.prisma.site.findUniqueOrThrow({ where: { id: siteId } }); }
  update(siteId: string, dto: UpdateSiteDto) { return this.prisma.site.update({ where: { id: siteId }, data: dto }); }
  async publish(siteId: string) {
    const pages = await this.prisma.page.findMany({ where: { siteId } });
    await Promise.all(pages.map((p) => this.schema.generateForPage(p.id)));
    await this.aeo.regenerateLlms(siteId);
    await this.audit.run(siteId);
    return this.prisma.site.update({ where: { id: siteId }, data: { status: 'published' } });
  }
}
