import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

type BaseSchema = {
  '@context': 'https://schema.org';
  '@type': string;
};

type WebPageSchema = BaseSchema & {
  '@type': 'WebPage';
  name: string;
  url: string;
};

type FAQPageSchema = BaseSchema & {
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
};

type PageSchema = WebPageSchema | FAQPageSchema;

@Injectable()
export class SchemaService {
  constructor(private readonly prisma: PrismaService) {}
  async generateForPage(pageId: string) {
    const page = await this.prisma.page.findUniqueOrThrow({ where: { id: pageId }, include: { site: true, faqItems: true } });
    const schema: PageSchema[] = [{ '@context': 'https://schema.org', '@type': 'WebPage', name: page.title, url: `${page.site.baseUrl ?? ''}${page.path}` }];
    if (page.faqItems.length) {
      schema.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: page.faqItems.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) });
    }
    await this.prisma.schemaSnapshot.create({ data: { pageId, jsonLd: schema as unknown as object, schemaTypesJson: schema.map((s) => s['@type']) as unknown as object } });
    return schema;
  }

  latest(pageId: string) { return this.prisma.schemaSnapshot.findFirst({ where: { pageId }, orderBy: { createdAt: 'desc' } }); }
}
