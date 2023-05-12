import { Injectable, Logger } from '@nestjs/common';
import CreatePlayerDto from './dtos/create_player.dto';
import { IPlayer } from './interfaces/players.interface';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);
  private players: IPlayer[] = [];

  async createUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
    this.create(createPlayerDto);
  }

  async getAll(): Promise<IPlayer[]> {
    return this.players;
  }

  private create(createPlayerDto: CreatePlayerDto): void {
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
