import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCuppingDto } from './dto/create-cupping.dto';
import { UpdateCuppingDto } from './dto/update-cupping.dto';

@Injectable()
export class CuppingsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(roasteryId: string) {
    return this.prisma.cupping.findMany({
      where: { roasteryId },
      include: { customer: true },
      orderBy: { date: 'asc' },
    });
  }

  async create(dto: CreateCuppingDto, roasteryId: string) {
    return this.prisma.cupping.create({
      data: {
        date: new Date(dto.date),
        duration: dto.duration || 45,
        type: (dto.type as any) || 'sample_tasting',
        notes: dto.notes || '',
        roasterName: dto.roasterName || '',
        customerId: dto.customerId,
        roasteryId,
      },
      include: { customer: true },
    });
  }

  async update(id: string, dto: UpdateCuppingDto, roasteryId: string) {
    const cupping = await this.prisma.cupping.findFirst({ where: { id, roasteryId } });
    if (!cupping) throw new NotFoundException('Cupping seansı bulunamadı');

    const data: Record<string, unknown> = { ...dto };
    if (dto.date) data.date = new Date(dto.date);
    if (dto.status) data.status = dto.status as any;
    if (dto.type) data.type = dto.type as any;

    return this.prisma.cupping.update({
      where: { id },
      data,
      include: { customer: true },
    });
  }

  async remove(id: string, roasteryId: string) {
    const cupping = await this.prisma.cupping.findFirst({ where: { id, roasteryId } });
    if (!cupping) throw new NotFoundException('Cupping seansı bulunamadı');
    return this.prisma.cupping.delete({ where: { id } });
  }
}
