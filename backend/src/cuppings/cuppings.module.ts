import { Module } from '@nestjs/common';
import { CuppingsController } from './cuppings.controller';
import { CuppingsService } from './cuppings.service';

@Module({
  controllers: [CuppingsController],
  providers: [CuppingsService],
})
export class CuppingsModule {}
