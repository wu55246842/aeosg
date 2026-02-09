import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { OrgsService } from './orgs.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { AddMemberDto, CreateOrgDto } from './dto/org.dto';

@UseGuards(JwtAuthGuard)
@Controller('orgs')
export class OrgsController {
  constructor(private readonly orgs: OrgsService) {}
  @Get() list(@CurrentUser() user: { sub: string }) { return this.orgs.list(user.sub); }
  @Post() create(@CurrentUser() user: { sub: string }, @Body() dto: CreateOrgDto) { return this.orgs.create(user.sub, dto); }
  @Post(':orgId/members') addMember(@Param('orgId') orgId: string, @Body() dto: AddMemberDto) { return this.orgs.addMember(orgId, dto); }
  @Patch(':orgId/members/:memberId') updateMember(@Param('orgId') orgId: string, @Param('memberId') memberId: string, @Body() dto: AddMemberDto) { return this.orgs.updateMember(orgId, memberId, dto.role); }
}
