import { Injectable } from '@nestjs/common';

@Injectable()
export class RenderService {
  renderHtml(input: { title: string; contentMd: string; schemaJsonLd?: object[] }) {
    const schema = input.schemaJsonLd?.map((s) => `<script type=\"application/ld+json\">${JSON.stringify(s)}</script>`).join('\n') ?? '';
    return `<!doctype html><html><head><title>${input.title}</title>${schema}</head><body><article><h1>${input.title}</h1><section>${input.contentMd.replace(/\n/g, '<br/>')}</section></article></body></html>`;
  }
}
