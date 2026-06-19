import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CuppingsService } from './cuppings.service';
import { CreateCuppingDto } from './dto/create-cupping.dto';
import { UpdateCuppingDto } from './dto/update-cupping.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('cuppings')
@UseGuards(JwtAuthGuard)
export class CuppingsController {
  constructor(private readonly cuppingsService: CuppingsService) {}

  @Get()
  findAll(@Request() req: any) {
    return this.cuppingsService.findAll(req.user.roasteryId);
  }

  @Post()
  create(@Body() dto: CreateCuppingDto, @Request() req: any) {
    return this.cuppingsService.create(dto, req.user.roasteryId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCuppingDto, @Request() req: any) {
    return this.cuppingsService.update(id, dto, req.user.roasteryId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    return this.cuppingsService.remove(id, req.user.roasteryId);
  }
}
