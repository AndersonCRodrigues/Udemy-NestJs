import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { CategoiesModule } from './categoies/categoies.module';
import { ChallengeModule } from './challenge/challenge.module';

config();

const MONGODB = process.env.MONGO_DB;

@Module({
  imports: [MongooseModule.forRoot(MONGODB), PlayersModule, CategoiesModule, ChallengeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
