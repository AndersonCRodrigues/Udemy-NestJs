import { Module } from '@nestjs/common';
import { CategoiesController } from './categoies.controller';
import { CategoiesService } from './categoies.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './interfaces/category.schema';
import { PlayersService } from 'src/players/players.service';
import { PlayerSchema } from 'src/players/interfaces/player.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Category',
        schema: CategorySchema,
      },
      {
        name: 'Player',
        schema: PlayerSchema,
      },
    ]),
  ],
  controllers: [CategoiesController],
  providers: [CategoiesService, PlayersService],
})
export class CategoiesModule {}
