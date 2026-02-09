import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditService {
  constructor(private readonly prisma: PrismaService) {}

  async run(siteId: string, pageId?: string) {
    const pages = pageId ? [await this.prisma.page.findUniqueOrThrow({ where: { id: pageId } })] : await this.prisma.page.findMany({ where: siteId === 'all' ? undefined : { siteId } });
    let score = 100;
    const findings: Array<{ code: string; severity: string; summary: string; fixSuggestion: string }> = [];
    if (!pages.length) {
      score -= 20;
      findings.push({ code: 'NO_PAGES', severity: 'high', summary: 'No published pages', fixSuggestion: 'Publish at least one page' });
    }
    for (const p of pages) {
      if (!p.contentMd.includes('#')) {score -= 10; findings.push({ code: 'NO_SEMANTIC_HEADINGS', severity: 'medium', summary: `${p.path} lacks headings`, fixSuggestion: 'Add H1-H4 hierarchy' });}
    }
    const audit = await this.prisma.audit.create({ data: { siteId, pageId, score: Math.max(score, 0), findingsJson: findings as unknown as object } });
    return audit;
  }

  latestSite(siteId: string) { return this.prisma.audit.findFirst({ where: { siteId, pageId: null }, orderBy: { createdAt: 'desc' } }); }
  latestPage(siteId: string, pageId: string) { return this.prisma.audit.findFirst({ where: { siteId, pageId }, orderBy: { createdAt: 'desc' } }); }
}
