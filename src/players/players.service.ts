import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
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

  private async findPlayer(email: string) {
    return this.playerModel.findOne({ email });
  }

  async getAll(): Promise<IPlayer[]> {
    return this.playerModel.find();
  }

  async getById(_id: string): Promise<IPlayer> {
    const player = await this.playerModel.findById(_id);

    if (!player) {
      throw new NotFoundException(`Player not found`);
    }
    return player;
  }

  async updatePlayer(
    _id: string,
    createPlayerDto: CreatePlayerDto,
  ): Promise<void> {
    try {
      this.playerModel.findByIdAndUpdate(
        { _id },
        { name: createPlayerDto.name },
      );
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<IPlayer> {
    try {
      if (await this.findPlayer(createPlayerDto.email)) {
        throw new BadRequestException('E-mail already registered ');
      }
      const player = new this.playerModel(createPlayerDto);
      return player.save();
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async deletePlayer(_id: string): Promise<any> {
    try {
      return this.playerModel.findByIdAndDelete(_id);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
