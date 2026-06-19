import { Module } from '@nestjs/common';
import { GreenBeansController } from './green-beans.controller';
import { GreenBeansService } from './green-beans.service';

@Module({
  controllers: [GreenBeansController],
  providers: [GreenBeansService],
})
export class GreenBeansModule {}
