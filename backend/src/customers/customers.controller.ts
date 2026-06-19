import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('customers')
@UseGuards(JwtAuthGuard)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  findAll(@Request() req: any) {
    return this.customersService.findAll(req.user.roasteryId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.customersService.findOne(id, req.user.roasteryId);
  }

  @Post()
  create(@Body() dto: CreateCustomerDto, @Request() req: any) {
    return this.customersService.create(dto, req.user.roasteryId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCustomerDto, @Request() req: any) {
    return this.customersService.update(id, dto, req.user.roasteryId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    return this.customersService.remove(id, req.user.roasteryId);
  }
}
