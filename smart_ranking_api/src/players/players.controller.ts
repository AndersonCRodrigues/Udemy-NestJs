import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import CreatePlayerDto from './dtos/create_player.dto';
import { PlayersService } from './players.service';
import { IPlayer } from './interfaces/players.interface';
import { ValidationParams } from '../common/pipes/validation.param.pipe';
import UpdatePlayerDto from './dtos/update-player.dto';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playerService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(
    @Body() createPlayerDto: CreatePlayerDto,
  ): Promise<IPlayer> {
    return await this.playerService.createPlayer(createPlayerDto);
  }

  @Patch('/:_id')
  @UsePipes(ValidationPipe)
  async updatePlayer(
    @Body() updatePlayerDto: UpdatePlayerDto,
    @Param('_id', ValidationParams) _id: string,
  ): Promise<void> {
    return this.playerService.updatePlayer(_id, updatePlayerDto);
  }

  @Get()
  async getPlayers(): Promise<IPlayer[]> {
    return this.playerService.getAll();
  }

  @Get('/:_id')
  async getPlayerById(
    @Param('_id', ValidationParams) _id: string,
  ): Promise<IPlayer> {
    return this.playerService.getById(_id);
  }

  @Delete('/:_id')
  async deletePlayer(
    @Param('_id', ValidationParams) _id: string,
  ): Promise<void> {
    return this.playerService.deletePlayer(_id);
  }
}
