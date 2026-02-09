import { IsOptional, IsString } from 'class-validator';

export class CreateSiteDto {
  @IsString() orgId!: string;
  @IsString() name!: string;
  @IsString() slug!: string;
}

export class UpdateSiteDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() baseUrl?: string;
}
