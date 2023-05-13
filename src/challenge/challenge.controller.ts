import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { CreateChallengeDto } from './dtos/create_challenge.dto';
import { IChallenge } from './interfaces/challenge.interface';

@Controller('api/v1/challenges')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createChallenge(
    @Body() createChallengeDto: CreateChallengeDto,
  ): Promise<IChallenge> {
    return this.challengeService.createChallenge(createChallengeDto);
  }

  @Get()
  async getChallenges(@Query('id') _id: string): Promise<IChallenge[]> {
    return _id
      ? await this.challengeService.getChallengeByPlayer(_id)
      : await this.challengeService.getAllChallenges();
  }
}
