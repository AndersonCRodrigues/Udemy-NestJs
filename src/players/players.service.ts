import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import CreatePlayerDto from './dtos/create_player.dto';
import { IPlayer } from './interfaces/players.interface';
// import { v4 as uuid4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);
  private players: IPlayer[] = [];

  constructor(
    @InjectModel('Player') private readonly playerModel: Model<IPlayer>,
  ) {}

  async createUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
    const { email } = createPlayerDto;

    const player = await this.findPlayer(email);

    if (player) {
      await this.update(createPlayerDto);
    } else {
      await this.create(createPlayerDto);
    }
  }

  private async findPlayer(email: string) {
    return this.playerModel.findOne({ email }).exec();
  }

  async getAll(): Promise<IPlayer[]> {
    return this.playerModel.find().exec();
  }

  async getByEmail(email: string): Promise<IPlayer> {
    const player = this.findPlayer(email);

    if (!player) {
      throw new NotFoundException(`Player not found with ${email}`);
    }
    return player;
  }

  private async update(createPlayerDto: CreatePlayerDto): Promise<IPlayer> {
    try {
      return this.playerModel
        .findByIdAndUpdate(
          { email: createPlayerDto.email },
          {
            $set: createPlayerDto,
          },
        )
        .exec();
    } catch (e) {
      throw new Error(e.message);
    }
  }

  private async create(createPlayerDto: CreatePlayerDto): Promise<IPlayer> {
    try {
      const player = new this.playerModel(createPlayerDto);
      return player.save();
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async deletePlayer(email: string): Promise<any> {
    try {
      return this.playerModel.findByIdAndRemove(email).exec();
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
