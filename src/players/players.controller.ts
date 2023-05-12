import { Body, Controller, Get, Post } from '@nestjs/common';
import CreatePlayerDto from './dtos/create_player.dto';
import { PlayersService } from './players.service';
import { IPlayer } from './interfaces/players.interface';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playerService: PlayersService) {}

  @Post()
  async createUpdatePlayer(@Body() createPlayerDto: CreatePlayerDto) {
    await this.playerService.createUpdatePlayer(createPlayerDto);
  }

  @Get()
  async getPlayers(): Promise<IPlayer[]> {
    return this.playerService.getAll();
  }
}
