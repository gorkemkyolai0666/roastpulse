import { IsString, IsOptional, IsNumber, IsEnum, IsDateString } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  productName?: string;

  @IsOptional()
  @IsNumber()
  weightKg?: number;

  @IsOptional()
  @IsEnum(['light', 'medium', 'medium_dark', 'dark'])
  roastLevel?: string;

  @IsOptional()
  @IsEnum(['quoted', 'confirmed', 'roasting', 'packed', 'shipped', 'cancelled'])
  status?: string;

  @IsOptional()
  @IsNumber()
  totalPrice?: number;

  @IsOptional()
  @IsNumber()
  paidAmount?: number;

  @IsOptional()
  @IsDateString()
  deliveryDate?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
