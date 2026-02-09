import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SchemaService } from '../schema/schema.service';
import { CreatePageDto, UpdatePageDto } from './dto/page.dto';

@Injectable()
export class PagesService {
  constructor(private readonly prisma: PrismaService, private readonly schema: SchemaService) {}
  list(siteId: string) { return this.prisma.page.findMany({ where: { siteId } }); }
  async create(siteId: string, dto: CreatePageDto) {
    return this.prisma.page.create({ data: { ...dto, siteId, revisions: { create: { version: 1, contentMd: dto.contentMd } } } });
  }
  get(pageId: string) { return this.prisma.page.findUniqueOrThrow({ where: { id: pageId } }); }
  async update(pageId: string, dto: UpdatePageDto) {
    const page = await this.prisma.page.update({ where: { id: pageId }, data: dto });
    if (dto.contentMd) {
      const latest = await this.prisma.pageRevision.findFirst({ where: { pageId }, orderBy: { version: 'desc' } });
      await this.prisma.pageRevision.create({ data: { pageId, version: (latest?.version ?? 1) + 1, contentMd: dto.contentMd } });
    }
    return page;
  }
  async publish(pageId: string) { await this.schema.generateForPage(pageId); return { published: true, pageId }; }
}
