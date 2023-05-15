import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';
import { PlayersService } from 'src/players/players.service';
import { CreateChallengeDto } from './dtos/create_challenge.dto';
import { IChallenge, IMatch } from './interfaces/challenge.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateChallengeDto } from './dtos/update_challenge';
import { AddChallengeMatchDto } from './dtos/add_challenge_match.dto';
import { ChallengeStatus } from './interfaces/challenge.status.enum';

@Injectable()
export class ChallengeService {
  constructor(
    @InjectModel('Challenge')
    private readonly challengeModel: Model<IChallenge>,
    @InjectModel('Match')
    private readonly matchModel: Model<IMatch>,
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
        'The requesting Player must be in the challenge',
      );
  }

  private async findChallengebyId(id: string): Promise<IChallenge> {
    const challenge = await this.challengeModel.findById(id);

    if (!challenge) throw new NotFoundException('Challenge not foud');

    return challenge;
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

  async updateChallenge(
    id: string,
    updateChallengeDto: UpdateChallengeDto,
  ): Promise<void> {
    const challenge = await this.findChallengebyId(id);
    if (updateChallengeDto.status) {
      challenge.dateHourResponse = new Date();
      challenge.status = updateChallengeDto.status;
    }
    if (updateChallengeDto.dateHourChallenge) {
      challenge.dateHourChallenge = updateChallengeDto.dateHourChallenge;
    }
    await this.challengeModel.findByIdAndUpdate(id, challenge);
  }

  async addChallengeMatch(
    id: string,
    addChallengeMatchDto: AddChallengeMatchDto,
  ): Promise<void> {
    const challenge = await this.findChallengebyId(id);
    if (
      !challenge.players.some(
        (player) => player._id.toString() === addChallengeMatchDto.def,
      )
    ) {
      throw new BadRequestException('Player is not part of this challenge');
    }

    const match = new this.matchModel(addChallengeMatchDto);
    match.category = challenge.category;
    match.players = challenge.players;
    const result = await match.save();
    challenge.status = ChallengeStatus.DONE;
    challenge.match = result._id;

    try {
      await this.challengeModel.findByIdAndUpdate(id, { $set: challenge });
    } catch (e) {
      await this.matchModel.deleteOne({ _id: result._id });
      throw new InternalServerErrorException();
    }
  }
}
