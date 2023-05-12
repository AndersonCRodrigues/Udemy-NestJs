import { Body, Controller, Post } from '@nestjs/common';
import CreatePlayerDto from './dtos/create_player.dto';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playerService: PlayersService) {}

  @Post()
  async createUpdatePlayer(@Body() createPlayerDto: CreatePlayerDto) {
    await this.playerService.createUpdatePlayer(createPlayerDto);
  }
}
