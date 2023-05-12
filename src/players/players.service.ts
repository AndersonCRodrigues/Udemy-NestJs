import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import CreatePlayerDto from './dtos/create_player.dto';
import { IPlayer } from './interfaces/players.interface';
import { v4 as uuid4 } from 'uuid';
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

    const player = this.findPlayer(email);

    if (player) {
      await this.update(player, createPlayerDto);
    } else {
      await this.create(createPlayerDto);
    }
  }

  private async findPlayer(email: string) {
    return this.playerModel.findOne({ email }).exec();
  }

  async getAll(): Promise<IPlayer[]> {
    return this.players;
  }

  async getByEmail(email: string): Promise<IPlayer> {
    const player = this.players.find((player) => player.email === email);

    if (!player) {
      throw new NotFoundException(`Player not found with ${email}`);
    }
    return player;
  }

  private async update(
    player: IPlayer,
    createPlayerDto: CreatePlayerDto,
  ): Promise<void> {
    player.name = createPlayerDto.name;
  }

  private async create(createPlayerDto: CreatePlayerDto): Promise<void> {
    const { email, name, phoneNumber } = createPlayerDto;

    const player: IPlayer = {
      _id: uuid4(),
      name,
      email,
      phoneNumber,
      ranking: 'A',
      rankingPosition: 1,
      urlImagePalyer: '',
    };
    this.logger.log(`createPplayerDto ${JSON.stringify(player)}`);
    this.players.push(player);
  }

  async deletePlayer(email: string): Promise<void> {
    const player = this.players.find((player) => player.email === email);
    if (!player) {
      throw new NotFoundException(`Player not found with ${email}`);
    }
    this.players = this.players.filter((p) => p.email !== player.email);
  }
}
