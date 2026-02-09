import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AeoService {
  constructor(private readonly prisma: PrismaService) {}

  async generateFaq(pageId: string) {
    const page = await this.prisma.page.findUniqueOrThrow({ where: { id: pageId } });
    const lines = page.contentMd.split('\n').filter((l) => /\?|如何|是什么|为什么|步骤/.test(l));
    const created = [] as { question: string; answer: string }[];
    for (const line of lines.slice(0, 5)) {
      const faq = await this.prisma.faqItem.create({ data: { pageId, question: line.replace('#', '').trim(), answer: `Answer: ${line.slice(0, 120)}`, source: 'auto' } });
      created.push({ question: faq.question, answer: faq.answer });
    }
    return created;
  }

  async regenerateLlms(siteId: string) {
    const site = await this.prisma.site.findUniqueOrThrow({ where: { id: siteId }, include: { pages: true, entities: true } });
    const top = site.pages.filter((p) => p.isIndexable).slice(0, 10);
    const content = [`# ${site.name}`, '## Top Pages', ...top.map((p) => `- ${p.path}: ${p.title}`)].join('\n');
    await this.prisma.llmsTxtSnapshot.create({ data: { siteId, content } });
    return content;
  }

  async latestLlms(siteId: string) { return this.prisma.llmsTxtSnapshot.findFirst({ where: { siteId }, orderBy: { createdAt: 'desc' } }); }
  sitemap(siteId: string) { return this.prisma.page.findMany({ where: { siteId, isIndexable: true } }); }
}
