import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreatePageDto {
  @IsString() path!: string;
  @IsString() title!: string;
  @IsString() contentMd!: string;
  @IsOptional() @IsString() excerpt?: string;
  @IsOptional() @IsString() locale?: string;
}

export class UpdatePageDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() contentMd?: string;
  @IsOptional() @IsString() excerpt?: string;
  @IsOptional() @IsBoolean() isIndexable?: boolean;
}
