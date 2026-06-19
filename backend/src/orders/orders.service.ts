import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(roasteryId: string) {
    return this.prisma.order.findMany({
      where: { roasteryId },
      include: { customer: true, roastProfile: true },
      orderBy: { orderDate: 'desc' },
    });
  }

  async create(dto: CreateOrderDto, roasteryId: string) {
    return this.prisma.order.create({
      data: {
        customerId: dto.customerId,
        roastProfileId: dto.roastProfileId || null,
        productName: dto.productName || '',
        weightKg: dto.weightKg || 5,
        roastLevel: (dto.roastLevel as any) || 'medium',
        totalPrice: dto.totalPrice || 0,
        paidAmount: dto.paidAmount || 0,
        orderDate: new Date(dto.orderDate),
        deliveryDate: dto.deliveryDate ? new Date(dto.deliveryDate) : null,
        notes: dto.notes || '',
        roasteryId,
      },
      include: { customer: true, roastProfile: true },
    });
  }

  async update(id: string, dto: UpdateOrderDto, roasteryId: string) {
    const order = await this.prisma.order.findFirst({ where: { id, roasteryId } });
    if (!order) throw new NotFoundException('Sipariş bulunamadı');

    const data: Record<string, unknown> = { ...dto };
    if (dto.roastLevel) data.roastLevel = dto.roastLevel as any;
    if (dto.status) data.status = dto.status as any;
    if (dto.deliveryDate) data.deliveryDate = new Date(dto.deliveryDate);

    return this.prisma.order.update({
      where: { id },
      data,
      include: { customer: true, roastProfile: true },
    });
  }
}
