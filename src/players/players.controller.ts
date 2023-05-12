import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
  async createUpdatePlayer(
    @Body() createPlayerDto: CreatePlayerDto,
  ): Promise<IPlayer> {
    return await this.playerService.createUpdatePlayer(createPlayerDto);
  }

  @Get()
  async getPlayers(): Promise<IPlayer[]> {
    return this.playerService.getAll();
  }

  @Get('/:_id')
  async getPlayerById(@Param('_id') _id: string): Promise<IPlayer> {
    return this.playerService.getById(_id);
  }

  @Delete()
  async deletePlayer(@Query('email', PlayersValidationParams) email: string) {
    return this.playerService.deletePlayer(email);
  }
}
