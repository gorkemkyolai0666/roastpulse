import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGreenBeanDto, UpdateGreenBeanDto } from './dto/green-bean.dto';

@Injectable()
export class GreenBeansService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(roasteryId: string) {
    return this.prisma.greenBean.findMany({
      where: { roasteryId },
      orderBy: { name: 'asc' },
    });
  }

  async create(dto: CreateGreenBeanDto, roasteryId: string) {
    return this.prisma.greenBean.create({
      data: {
        name: dto.name,
        origin: (dto.origin as any) || 'other',
        processing: (dto.processing as any) || 'washed',
        stockKg: dto.stockKg ?? 0,
        unitCost: dto.unitCost ?? 0,
        supplier: dto.supplier || '',
        harvestYear: dto.harvestYear ?? 2024,
        notes: dto.notes || '',
        roasteryId,
      },
    });
  }

  async update(id: string, dto: UpdateGreenBeanDto, roasteryId: string) {
    const bean = await this.prisma.greenBean.findFirst({ where: { id, roasteryId } });
    if (!bean) throw new NotFoundException('Yeşil çekirdek bulunamadı');

    const data: Record<string, unknown> = { ...dto };
    if (dto.origin) data.origin = dto.origin as any;
    if (dto.processing) data.processing = dto.processing as any;

    return this.prisma.greenBean.update({ where: { id }, data });
  }

  async remove(id: string, roasteryId: string) {
    const bean = await this.prisma.greenBean.findFirst({ where: { id, roasteryId } });
    if (!bean) throw new NotFoundException('Yeşil çekirdek bulunamadı');
    return this.prisma.greenBean.delete({ where: { id } });
  }
}
