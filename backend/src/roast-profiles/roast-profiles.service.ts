import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoastProfileDto, UpdateRoastProfileDto } from './dto/roast-profile.dto';

@Injectable()
export class RoastProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(roasteryId: string) {
    return this.prisma.roastProfile.findMany({
      where: { roasteryId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(dto: CreateRoastProfileDto, roasteryId: string) {
    return this.prisma.roastProfile.create({
      data: {
        name: dto.name,
        origin: dto.origin || '',
        variety: dto.variety || '',
        roastLevel: (dto.roastLevel as any) || 'medium',
        chargeTemp: dto.chargeTemp ?? 200,
        dropTemp: dto.dropTemp ?? 215,
        durationMin: dto.durationMin ?? 12,
        description: dto.description || '',
        roasteryId,
      },
    });
  }

  async update(id: string, dto: UpdateRoastProfileDto, roasteryId: string) {
    const profile = await this.prisma.roastProfile.findFirst({ where: { id, roasteryId } });
    if (!profile) throw new NotFoundException('Kavurma profili bulunamadı');

    const data: Record<string, unknown> = { ...dto };
    if (dto.roastLevel) data.roastLevel = dto.roastLevel as any;

    return this.prisma.roastProfile.update({ where: { id }, data });
  }
}
