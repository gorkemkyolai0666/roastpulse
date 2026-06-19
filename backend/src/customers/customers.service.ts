import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(roasteryId: string) {
    return this.prisma.customer.findMany({
      where: { roasteryId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, roasteryId: string) {
    const customer = await this.prisma.customer.findFirst({
      where: { id, roasteryId },
      include: {
        cuppings: { orderBy: { date: 'desc' }, take: 5 },
        orders: { orderBy: { orderDate: 'desc' }, take: 5 },
      },
    });
    if (!customer) throw new NotFoundException('Müşteri bulunamadı');
    return customer;
  }

  async create(dto: CreateCustomerDto, roasteryId: string) {
    return this.prisma.customer.create({
      data: {
        companyName: dto.companyName,
        contactName: dto.contactName || '',
        phone: dto.phone,
        email: dto.email || '',
        address: dto.address || '',
        city: dto.city || '',
        notes: dto.notes || '',
        roasteryId,
      },
    });
  }

  async update(id: string, dto: UpdateCustomerDto, roasteryId: string) {
    const customer = await this.prisma.customer.findFirst({ where: { id, roasteryId } });
    if (!customer) throw new NotFoundException('Müşteri bulunamadı');
    return this.prisma.customer.update({ where: { id }, data: dto });
  }

  async remove(id: string, roasteryId: string) {
    const customer = await this.prisma.customer.findFirst({ where: { id, roasteryId } });
    if (!customer) throw new NotFoundException('Müşteri bulunamadı');

    await this.prisma.order.deleteMany({ where: { customerId: id } });
    await this.prisma.cupping.deleteMany({ where: { customerId: id } });

    return this.prisma.customer.delete({ where: { id } });
  }
}
