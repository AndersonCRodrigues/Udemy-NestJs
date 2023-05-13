import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { CreateChallengeDto } from './dtos/create_challenge.dto';
import { IChallenge } from './interfaces/challenge.interface';
import { ChallengeStatusValidation } from './pipes/challenge.satus.pipe';
import { UpdateChallengeDto } from './dtos/update_challenge';

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

  @Patch('/:challenge')
  async updateChallenge(
    @Body(ChallengeStatusValidation) updateChallengeDto: UpdateChallengeDto,
    @Param('challenge') _id: string,
  ): Promise<void> {
    return await this.challengeService.updateChallenge(_id, updateChallengeDto);
  }
}
