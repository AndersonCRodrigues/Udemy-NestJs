import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { CreateChallengeDto } from './dtos/create_challenge.dto';

@Controller('/api/v1/challenge')
export class ChallengeController {

  constructor(provate readonly challengeService: ChallengeService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createChallenge(
    @Body() createChallengeDto: CreateChallengeDto): Promise<IChallenge> {
      return this.challengeService.createChallenge(createChallengeDto)
    }
}
