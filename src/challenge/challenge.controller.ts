import {
  Body,
  Controller,
  Delete,
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
import { AddChallengeMatchDto } from './dtos/add_challenge_match.dto';

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
    @Param('challenge') challenge: string,
    @Body(ChallengeStatusValidation) updateChallengeDto: UpdateChallengeDto,
  ) {
    return this.challengeService.updateChallenge(challenge, updateChallengeDto);
  }

  @Post('/:challenge/match')
  async addChallengeMatch(
    @Body(ValidationPipe) addChallengeMatchDto: AddChallengeMatchDto,
    @Param('challenge') _id: string,
  ): Promise<void> {
    return this.challengeService.addChallengeMatch(_id, addChallengeMatchDto);
  }

  @Delete('/challenge')
  async deleteChallenge(@Param('challenge') id: string): Promise<void> {
    return this.challengeService.deleteChallenge(id);
  }
}
