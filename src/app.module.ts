import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';

config();

const MONGODB = process.env.MONGO_DB;

@Module({
  imports: [MongooseModule.forRoot(MONGODB), PlayersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
