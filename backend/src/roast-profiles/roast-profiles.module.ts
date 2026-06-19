import { Module } from '@nestjs/common';
import { RoastProfilesController } from './roast-profiles.controller';
import { RoastProfilesService } from './roast-profiles.service';

@Module({
  controllers: [RoastProfilesController],
  providers: [RoastProfilesService],
})
export class RoastProfilesModule {}
