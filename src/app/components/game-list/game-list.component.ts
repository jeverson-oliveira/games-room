import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Game } from '../../models/game.model';
import { GameService } from '../../services/game.service';
import { FiltersComponent } from '../filters/filters.component';
import { GameCardComponent } from '../game-card/game-card.component';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [FiltersComponent, GameCardComponent, RouterLink],
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameListComponent implements OnInit {
  games = signal<Game[]>([]);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.loadGames();
  }

  loadGames() {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.gameService.getAllGames().subscribe({
      next: (data) => {
        this.games.set(data);
        this.isLoading.set(false);
      },
      error: (error: Error) => {
        this.errorMessage.set(error.message);
        this.games.set([]);
        this.isLoading.set(false);
      }
    });
  }

  filterByPlatform(platform: string) {
    if (!platform) { this.loadGames(); return; }
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.gameService.getGamesByPlatform(platform).subscribe({
      next: (data) => {
        this.games.set(data);
        this.isLoading.set(false);
      },
      error: (error: Error) => {
        this.errorMessage.set(error.message);
        this.isLoading.set(false);
      }
    });
  }

  filterByGenre(genre: string) {
    if (!genre) { this.loadGames(); return; }
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.gameService.getGamesByCategory(genre).subscribe({
      next: (data) => {
        this.games.set(data);
        this.isLoading.set(false);
      },
      error: (error: Error) => {
        this.errorMessage.set(error.message);
        this.isLoading.set(false);
      }
    });
  }

  retry() {
    this.loadGames();
  }
}
