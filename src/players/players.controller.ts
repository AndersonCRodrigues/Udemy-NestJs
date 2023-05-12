import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import CreatePlayerDto from './dtos/create_player.dto';
import { PlayersService } from './players.service';
import { IPlayer } from './interfaces/players.interface';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playerService: PlayersService) {}

  @Post()
  @UsePipes()
  async createUpdatePlayer(
    @Body() createPlayerDto: CreatePlayerDto,
  ): Promise<IPlayer> {
    return await this.playerService.createUpdatePlayer(createPlayerDto);
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
  async deletePlayer(@Query('email') email: string) {
    return this.playerService.deletePlayer(email);
  }
}
