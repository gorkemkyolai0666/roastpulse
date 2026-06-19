import { IsString, IsOptional, IsNumber, IsEnum, IsDateString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  customerId: string;

  @IsOptional()
  @IsString()
  roastProfileId?: string;

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
  @IsNumber()
  totalPrice?: number;

  @IsOptional()
  @IsNumber()
  paidAmount?: number;

  @IsDateString()
  orderDate: string;

  @IsOptional()
  @IsDateString()
  deliveryDate?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
