import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats(roasteryId: string) {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(todayStart.getTime() + 86400000);
    const weekEnd = new Date(todayStart.getTime() + 7 * 86400000);

    const [
      totalCustomers,
      todayCuppings,
      weekCuppings,
      pendingOrders,
      readyOrders,
      totalOrders,
      lowStockBeans,
      recentCustomers,
      upcomingCuppings,
    ] = await Promise.all([
      this.prisma.customer.count({ where: { roasteryId } }),
      this.prisma.cupping.count({
        where: { roasteryId, date: { gte: todayStart, lt: todayEnd } },
      }),
      this.prisma.cupping.count({
        where: { roasteryId, date: { gte: todayStart, lt: weekEnd } },
      }),
      this.prisma.order.count({
        where: { roasteryId, status: { in: ['quoted', 'confirmed', 'roasting'] } },
      }),
      this.prisma.order.count({
        where: { roasteryId, status: 'packed' },
      }),
      this.prisma.order.count({ where: { roasteryId } }),
      this.prisma.greenBean.count({
        where: { roasteryId, stockKg: { lt: 20 } },
      }),
      this.prisma.customer.findMany({
        where: { roasteryId },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
      this.prisma.cupping.findMany({
        where: {
          roasteryId,
          date: { gte: todayStart },
          status: { in: ['scheduled', 'confirmed'] },
        },
        include: { customer: true },
        orderBy: { date: 'asc' },
        take: 5,
      }),
    ]);

    return {
      totalCustomers,
      todayCuppings,
      weekCuppings,
      pendingOrders,
      readyOrders,
      totalOrders,
      lowStockBeans,
      recentCustomers,
      upcomingCuppings,
    };
  }
}
