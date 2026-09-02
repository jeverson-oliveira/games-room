import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Game } from '../../models/game.model';
import { GameService } from '../../services/game.service';
import { GameCardComponent } from '../game-card/game-card.component';

@Component({
  selector: 'app-trending',
  standalone: true,
  imports: [GameCardComponent, RouterLink],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrendingComponent implements OnInit {
  games = signal<Game[]>([]);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.loadTrending();
  }

  loadTrending() {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.gameService.getGamesSorted('popularity').subscribe({
      next: (data) => {
        this.games.set(data);
        this.isLoading.set(false);
      },
      error: (err: Error) => {
        this.errorMessage.set(err.message);
        this.isLoading.set(false);
      },
    });
  }

  retry() {
    this.loadTrending();
  }
}
