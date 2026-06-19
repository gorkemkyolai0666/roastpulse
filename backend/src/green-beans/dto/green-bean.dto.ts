import { IsString, IsOptional, IsNumber, IsEnum, IsInt } from 'class-validator';

export class CreateGreenBeanDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(['ethiopia', 'colombia', 'brazil', 'kenya', 'guatemala', 'indonesia', 'turkey', 'other'])
  origin?: string;

  @IsOptional()
  @IsEnum(['washed', 'natural', 'honey', 'anaerobic', 'other'])
  processing?: string;

  @IsOptional()
  @IsNumber()
  stockKg?: number;

  @IsOptional()
  @IsNumber()
  unitCost?: number;

  @IsOptional()
  @IsString()
  supplier?: string;

  @IsOptional()
  @IsInt()
  harvestYear?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateGreenBeanDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(['ethiopia', 'colombia', 'brazil', 'kenya', 'guatemala', 'indonesia', 'turkey', 'other'])
  origin?: string;

  @IsOptional()
  @IsEnum(['washed', 'natural', 'honey', 'anaerobic', 'other'])
  processing?: string;

  @IsOptional()
  @IsNumber()
  stockKg?: number;

  @IsOptional()
  @IsNumber()
  unitCost?: number;

  @IsOptional()
  @IsString()
  supplier?: string;

  @IsOptional()
  @IsInt()
  harvestYear?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
