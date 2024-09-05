/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Player } from './player.interface';

@Injectable()
export class PlayersService {
  private players: Player[] = [
    { id: 1, name: 'Lionel', lastName: 'Messi', club: 'Inter Miami' },
    { id: 2, name: 'Cristiano', lastName: 'Ronaldo', club: 'Al Nassr' },
    { id: 3, name: 'Neymar', lastName: 'Jr', club: 'Al-Hilal' },
    { id: 4, name: 'Kylian', lastName: 'Mbappe', club: 'Paris Saint-Germain' },
    { id: 5, name: 'Robert', lastName: 'Lewandowski', club: 'Barcelona' },
    { id: 6, name: 'Erling', lastName: 'Haaland', club: 'Manchester City' },
    { id: 7, name: 'Kevin', lastName: 'De Bruyne', club: 'Manchester City' },
    { id: 8, name: 'Mohamed', lastName: 'Salah', club: 'Liverpool' },
    { id: 9, name: 'Karim', lastName: 'Benzema', club: 'Al-Ittihad' },
    { id: 10, name: 'Sadio', lastName: 'Mané', club: 'Al-Nassr' },
  ];

  /**
   * @description method to get all the players list
   * @returns
   */
  getPlayers(): Player[] {
    return this.players;
  }

  /**
   * @description method to find the player by its id
   * @param id
   * @returns
   */
  getPlayerById(id: number): Player {
    return this.players.find((player) => player.id === id);
  }

  /**
   * @description method to create a new player
   * @param {Partial<Player>} player
   * @returns {Player | undefined}
   */
  create(player: Partial<Player>): Player | undefined {
    // Ensure name, lastName, and club are provided
    if (!player.name || !player.lastName || !player.club) {
      throw new BadRequestException(
        'Missing required fields: name, lastName, or club.',
      );
    }

    // Normalize data for duplicate check (case-insensitive and trim whitespace)
    const normalizedName = player.name.trim().toLowerCase();
    const normalizedLastName = player.lastName.trim().toLowerCase();
    const normalizedClub = player.club.trim().toLowerCase();

    // Check if a player with the same normalized data already exists
    const isDuplicate = this.players.some(
      (existingPlayer) =>
        existingPlayer.name.trim().toLowerCase() === normalizedName &&
        existingPlayer.lastName.trim().toLowerCase() === normalizedLastName &&
        existingPlayer.club.trim().toLowerCase() === normalizedClub,
    );

    if (isDuplicate) {
      throw new ConflictException(
        'Player with the same name, lastName, and club already exists.',
      );
    }

    // Generate new ID
    const newId = this.players.length
      ? this.players[this.players.length - 1].id + 1
      : 1;

    // Create a new player
    const newPlayer: Player = {
      id: newId,
      name: player.name.trim(),
      lastName: player.lastName.trim(),
      club: player.club.trim(),
    };

    // Add the new player to the list
    this.players.push(newPlayer);
    return newPlayer;
  }

  /**
   * @description method to update the player
   * @param id
   * @param updatedPlayer
   * @returns Player
   */
  update(id: number, updatedPlayer: Partial<Player>): Player | undefined {
    const playerIndex = this.players.findIndex((player) => player.id === id);

    if (playerIndex === -1) {
      return undefined;
    }

    //Merge the updated data with the existing player
    const currentPlayer = this.players[playerIndex];
    const newPlayerData: Player = { ...currentPlayer, ...updatedPlayer };

    this.players[playerIndex] = newPlayerData;
    return newPlayerData;
  }

  /**
   * @description method to delete the player by its id
   * @param id
   * @returns
   */
  delete(id: number): Player | undefined {
    const playerIndex = this.players.findIndex((player) => player.id === id);
    if (playerIndex === -1) {
      return undefined;
    }
    const deletedPlayer = this.players[playerIndex];
    this.players.splice(playerIndex, 1);
    this.players.forEach((player, index) => {
      player.id = index + 1;
    });
    return deletedPlayer;
  }
}
