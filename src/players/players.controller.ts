import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
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
  async getPlayers(
    @Query('email') email: string,
  ): Promise<IPlayer[] | IPlayer> {
    if (email) {
      return this.playerService.getByEmail(email);
    } else {
      return this.playerService.getAll();
    }
  }

  @Delete()
  async deletePlayer(@Query('email') email: string): Promise<void> {
    this.playerService.delete(email);
  }
}
