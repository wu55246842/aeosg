import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CitationsService {
  constructor(private readonly prisma: PrismaService) {}
  create(siteId: string, data: any) { return this.prisma.citation.create({ data: { siteId, ...data } }); }
  list(siteId: string) { return this.prisma.citation.findMany({ where: { siteId }, orderBy: { createdAt: 'desc' } }); }
}
