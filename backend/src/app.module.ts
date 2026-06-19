import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { CustomersModule } from './customers/customers.module';
import { CuppingsModule } from './cuppings/cuppings.module';
import { OrdersModule } from './orders/orders.module';
import { RoastProfilesModule } from './roast-profiles/roast-profiles.module';
import { GreenBeansModule } from './green-beans/green-beans.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    HealthModule,
    CustomersModule,
    CuppingsModule,
    OrdersModule,
    RoastProfilesModule,
    GreenBeansModule,
    DashboardModule,
  ],
})
export class AppModule {}
