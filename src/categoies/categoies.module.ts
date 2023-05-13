import { Module } from '@nestjs/common';
import { CategoiesController } from './categoies.controller';
import { CategoiesService } from './categoies.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './interfaces/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
  ],
  controllers: [CategoiesController],
  providers: [CategoiesService],
})
export class CategoiesModule {}
