import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';
import { PlayersService } from 'src/players/players.service';
import { CreateChallengeDto } from './dtos/create_challenge.dto';
import { IChallenge, IMatch } from './interfaces/challenge.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ChallengeService {
  constructor(
    @InjectModel('Challenge')
    private readonly challengeModel: Model<IChallenge>,
    @InjectModel('Match') matchModel: Model<IMatch>,
    private readonly categoryService: CategoriesService,
    private readonly playerService: PlayersService,
  ) {}

  private async checkPlayers(
    createChallengeDto: CreateChallengeDto,
  ): Promise<void> {
    if (createChallengeDto.players[0]._id === createChallengeDto.players[1]._id)
      throw new BadRequestException('Players must be different');

    createChallengeDto.players.forEach(
      async (player) => await this.playerService.getById(player._id),
    );

    if (
      !createChallengeDto.players.some(
        (player) => player._id === createChallengeDto.requester,
      )
    )
      throw new BadRequestException(
        'The requesting Player must be in the match',
      );
  }

  async createChallenge(
    createChallengeDto: CreateChallengeDto,
  ): Promise<IChallenge> {
    await this.checkPlayers(createChallengeDto);
    const category = await this.categoryService.getCategoryByPlayer(
      createChallengeDto.requester,
    );

    const challenge = new this.challengeModel(createChallengeDto);
    challenge.category = category.category;

    return challenge.save();
  }

  async getAllChallenges(): Promise<IChallenge[]> {
    return this.challengeModel
      .find()
      .populate('requester')
      .populate('players')
      .populate('match');
  }

  async getChallengeByPlayer(_id: string): Promise<IChallenge[]> {
    await this.playerService.getById(_id);
    const challenge = await this.challengeModel
      .find()
      .where('players')
      .in([_id])
      .populate('requester')
      .populate('players')
      .populate('match');

    if (!challenge.length)
      throw new NotFoundException('Player has no challenges');

    return challenge;
  }
}
