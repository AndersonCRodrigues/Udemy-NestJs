import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import CreatePlayerDto from './dtos/create_player.dto';
import { IPlayer } from './interfaces/players.interface';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);
  private players: IPlayer[] = [];

  async createUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
    const { email } = createPlayerDto;

    const player = await this.players.find((player) => player.email === email);

    if (player) {
      await this.update(player, createPlayerDto);
    } else {
      await this.create(createPlayerDto);
    }
  }

  async getAll(): Promise<IPlayer[]> {
    return this.players;
  }

  async getByEmail(email: string): Promise<IPlayer> {
    const player = await this.players.find((player) => player.email === email);

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
}
