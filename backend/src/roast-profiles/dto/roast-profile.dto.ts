import { IsString, IsOptional, IsNumber, IsEnum } from 'class-validator';

export class CreateRoastProfileDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  origin?: string;

  @IsOptional()
  @IsString()
  variety?: string;

  @IsOptional()
  @IsEnum(['light', 'medium', 'medium_dark', 'dark'])
  roastLevel?: string;

  @IsOptional()
  @IsNumber()
  chargeTemp?: number;

  @IsOptional()
  @IsNumber()
  dropTemp?: number;

  @IsOptional()
  @IsNumber()
  durationMin?: number;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateRoastProfileDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  origin?: string;

  @IsOptional()
  @IsString()
  variety?: string;

  @IsOptional()
  @IsEnum(['light', 'medium', 'medium_dark', 'dark'])
  roastLevel?: string;

  @IsOptional()
  @IsNumber()
  chargeTemp?: number;

  @IsOptional()
  @IsNumber()
  dropTemp?: number;

  @IsOptional()
  @IsNumber()
  durationMin?: number;

  @IsOptional()
  @IsString()
  description?: string;
}
