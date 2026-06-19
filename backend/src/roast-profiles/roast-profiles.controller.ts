import { Controller, Get, Post, Patch, Body, Param, UseGuards, Request } from '@nestjs/common';
import { RoastProfilesService } from './roast-profiles.service';
import { CreateRoastProfileDto, UpdateRoastProfileDto } from './dto/roast-profile.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('roast-profiles')
@UseGuards(JwtAuthGuard)
export class RoastProfilesController {
  constructor(private readonly roastProfilesService: RoastProfilesService) {}

  @Get()
  findAll(@Request() req: any) {
    return this.roastProfilesService.findAll(req.user.roasteryId);
  }

  @Post()
  create(@Body() dto: CreateRoastProfileDto, @Request() req: any) {
    return this.roastProfilesService.create(dto, req.user.roasteryId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRoastProfileDto, @Request() req: any) {
    return this.roastProfilesService.update(id, dto, req.user.roasteryId);
  }
}
