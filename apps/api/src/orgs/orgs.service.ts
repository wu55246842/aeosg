import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddMemberDto, CreateOrgDto } from './dto/org.dto';

@Injectable()
export class OrgsService {
  constructor(private readonly prisma: PrismaService) {}
  list(userId: string) { return this.prisma.orgMember.findMany({ where: { userId }, include: { org: true } }); }
  async create(userId: string, dto: CreateOrgDto) {
    return this.prisma.org.create({ data: { name: dto.name, ownerId: userId, members: { create: { userId, role: 'owner' } } } });
  }
  addMember(orgId: string, dto: AddMemberDto) { return this.prisma.orgMember.create({ data: { orgId, userId: dto.userId, role: dto.role } }); }
  updateMember(orgId: string, memberId: string, role: AddMemberDto['role']) { return this.prisma.orgMember.update({ where: { id: memberId }, data: { role } }); }
}
