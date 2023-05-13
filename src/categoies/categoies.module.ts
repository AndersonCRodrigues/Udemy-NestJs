import { Module } from '@nestjs/common';
import { CategoiesController } from './categoies.controller';

@Module({
  controllers: [CategoiesController]
})
export class CategoiesModule {}
