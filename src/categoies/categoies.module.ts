import { Module } from '@nestjs/common';
import { CategoiesController } from './categoies.controller';
import { CategoiesService } from './categoies.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './interfaces/category.schema';
import { PlayersModule } from 'src/players/players.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
    PlayersModule,
  ],
  controllers: [CategoiesController],
  providers: [CategoiesService],
})
export class CategoiesModule {}
