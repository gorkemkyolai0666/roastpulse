import { IsString, IsOptional, IsNumber, IsEnum, IsDateString } from 'class-validator';

export class UpdateCuppingDto {
  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsNumber()
  duration?: number;

  @IsOptional()
  @IsEnum(['quality_check', 'sample_tasting', 'training', 'wholesale_visit'])
  type?: string;

  @IsOptional()
  @IsEnum(['scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show'])
  status?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  roasterName?: string;
}
