import { Injectable } from '@nestjs/common';
import { CategoiesService } from 'src/categories/categories.service';
import { PlayersService } from 'src/players/players.service';
import { CreateChallengeDto } from './dtos/create_challenge.dto';

@Injectable()
export class ChallengeService {
  constructor(
    private readonly categoryService: CategoiesService,
    private readonly playerService: PlayersService,
  ) {}

  async createChallenge(
    createChallengeDto: CreateChallengeDto,
  ): Promise<IChallenge> {
    createChallengeDto.players.forEach(
      async (player) => await this.playerService.getById(player._id),
    );

    const players = await this.playerService.getAll();
  }
}
