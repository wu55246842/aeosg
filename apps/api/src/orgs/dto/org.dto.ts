import { IsEnum, IsString } from 'class-validator';

export class CreateOrgDto { @IsString() name!: string; }
export class AddMemberDto { @IsString() userId!: string; @IsEnum(['owner','admin','editor','viewer']) role!: 'owner'|'admin'|'editor'|'viewer'; }
