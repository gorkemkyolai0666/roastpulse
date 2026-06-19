import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { GreenBeansService } from './green-beans.service';
import { CreateGreenBeanDto, UpdateGreenBeanDto } from './dto/green-bean.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('green-beans')
@UseGuards(JwtAuthGuard)
export class GreenBeansController {
  constructor(private readonly greenBeansService: GreenBeansService) {}

  @Get()
  findAll(@Request() req: any) {
    return this.greenBeansService.findAll(req.user.roasteryId);
  }

  @Post()
  create(@Body() dto: CreateGreenBeanDto, @Request() req: any) {
    return this.greenBeansService.create(dto, req.user.roasteryId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateGreenBeanDto, @Request() req: any) {
    return this.greenBeansService.update(id, dto, req.user.roasteryId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    return this.greenBeansService.remove(id, req.user.roasteryId);
  }
}
