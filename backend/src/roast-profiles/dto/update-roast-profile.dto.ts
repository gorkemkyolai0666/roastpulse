import { IsString, IsOptional, IsEnum } from 'class-validator';

export class UpdateRoastProfileDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  topNotes?: string;

  @IsOptional()
  @IsString()
  middleNotes?: string;

  @IsOptional()
  @IsString()
  baseNotes?: string;

  @IsOptional()
  @IsEnum(['edt', 'edp', 'parfum', 'extrait'])
  concentration?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
