import { Module } from '@nestjs/common';
import { CategoiesController } from './categoies.controller';
import { CategoiesService } from './categoies.service';

@Module({
  controllers: [CategoiesController],
  providers: [CategoiesService]
})
export class CategoiesModule {}
