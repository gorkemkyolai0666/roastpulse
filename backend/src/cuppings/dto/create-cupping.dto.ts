import { IsString, IsOptional, IsNumber, IsEnum, IsDateString } from 'class-validator';

export class CreateCuppingDto {
  @IsDateString()
  date: string;

  @IsString()
  customerId: string;

  @IsOptional()
  @IsNumber()
  duration?: number;

  @IsOptional()
  @IsEnum(['quality_check', 'sample_tasting', 'training', 'wholesale_visit'])
  type?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  roasterName?: string;
}
