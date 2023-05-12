import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import CreatePlayerDto from './dtos/create_player.dto';
import { PlayersService } from './players.service';
import { IPlayer } from './interfaces/players.interface';
import { PlayersValidationParams } from './pipes/player_validation_param.pipe';

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
    @Body() createPlayerDto: CreatePlayerDto,
    @Param('_id', PlayersValidationParams) _id: string,
  ): Promise<IPlayer> {
    return await this.playerService.updatePlayer(_id, createPlayerDto);
  }

  @Get()
  async getPlayers(): Promise<IPlayer[]> {
    return this.playerService.getAll();
  }

  @Get('/:_id')
  async getPlayerById(
    @Param('_id', PlayersValidationParams) _id: string,
  ): Promise<IPlayer> {
    return this.playerService.getById(_id);
  }

  @Delete()
  async deletePlayer(
    @Query('email', PlayersValidationParams) email: string,
  ): Promise<void> {
    this.playerService.deletePlayer(email);
  }
}
