import { Component, OnInit } from '@angular/core';

import { GameService } from '../../services/game.service';
import { FiltersComponent } from '../filters/filters.component';
import { GameCardComponent } from '../game-card/game-card.component';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [FiltersComponent, GameCardComponent],
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
  games: any[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.loadGames();
  }

  loadGames() {
    this.gameService.getAllGames().subscribe({
      next: (data) => {
        console.log('Games loaded:', data);
        this.games = data;
      },
      error: (error) => {
        console.error('Error loading games:', error);
        this.games = [];
      }
    });
  }

  filterByPlatform(platform: string) {
    this.gameService.getGamesByPlatform(platform).subscribe({
      next: (data) => {
        this.games = data;
      },
      error: (error) => {
        console.error('Error filtering by platform:', error);
      }
    });
  }

  filterByGenre(genre: string) {
    this.gameService.getGamesByCategory(genre).subscribe({
      next: (data) => {
        this.games = data;
      },
      error: (error) => {
        console.error('Error filtering by genre:', error);
      }
    });
  }
}
