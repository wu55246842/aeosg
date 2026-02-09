import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class McpService {
  constructor(private readonly prisma: PrismaService) {}
  async buildStreamPayload(sessionId: string) {
    const sites = await this.prisma.site.findMany({ where: { status: 'published' }, include: { pages: true, entities: true } });
    return [
      { type: 'session', sessionId },
      ...sites.map((s) => ({ type: 'site.summary', siteId: s.id, name: s.name, pages: s.pages.length })),
      ...sites.flatMap((s) => s.pages.slice(0, 5).map((p) => ({ type: 'page.answerBlocks', siteId: s.id, path: p.path, blocks: p.contentMd.split('\n').slice(0, 3) })))
    ];
  }
}
