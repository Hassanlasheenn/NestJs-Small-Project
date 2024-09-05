import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { Player } from './player.interface';

@Controller('players')
export class PlayersController {
  constructor(private _playerService: PlayersService) {}
  @Get()
  getPlayers(): Player[] {
    return this._playerService.getPlayers();
  }

  @Get(':id')
  getPlayerById(@Param('id') id: string): Player {
    return this._playerService.getPlayerById(+id);
  }

  @Post()
  createPlayers(@Body() player: Partial<Player>): Player | undefined {
    return this._playerService.create(player);
  }

  @Put(':id')
  updatePlayer(
    @Param('id') id: string,
    @Body() updatedPlayer: Partial<Player>,
  ): Player | undefined {
    return this._playerService.update(+id, updatedPlayer);
  }

  @Delete(':id')
  deletePlayer(@Param('id') id: string): Player | undefined {
    return this._playerService.delete(+id);
  }
}
