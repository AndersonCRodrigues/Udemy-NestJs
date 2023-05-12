import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { MongooseModule } from '@nestjs/mongoose';

const MONGODB = process.env.MONGO_DB;

@Module({
  imports: [MongooseModule.forRoot(MONGODB), PlayersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
