import { ChangeDetectionStrategy, Component, OnInit, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Game } from '../../models/game.model';
import { GameService } from '../../services/game.service';
import { FilterState, FiltersComponent } from '../filters/filters.component';
import { GameCardComponent } from '../game-card/game-card.component';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [FiltersComponent, GameCardComponent, RouterLink],
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameListComponent implements OnInit {
  private allGames = signal<Game[]>([]);
  filterState = signal<FilterState>({ platform: '', genre: '', search: '' });
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  visibleCount = signal(24);
  readonly pageSize = 24;

  filteredGames = computed(() => {
    const search = this.filterState().search.toLowerCase();
    if (!search) return this.allGames();
    return this.allGames().filter(
      (g) =>
        g.title.toLowerCase().includes(search) ||
        g.genre.toLowerCase().includes(search) ||
        g.platform.toLowerCase().includes(search),
    );
  });

  games = computed(() => this.filteredGames().slice(0, this.visibleCount()));
  totalFiltered = computed(() => this.filteredGames().length);
  canLoadMore = computed(() => this.visibleCount() < this.filteredGames().length);

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.loadGames();
  }

  loadGames() {
    this.fetchGames({ platform: '', genre: '', search: '' });
  }

  onFiltersChange(state: FilterState) {
    this.filterState.set(state);
    this.visibleCount.set(this.pageSize);
    this.fetchGames(state);
  }

  // keep for backwards compat with old template if needed
  filterByPlatform(platform: string) {
    this.onFiltersChange({ ...this.filterState(), platform });
  }

  filterByGenre(genre: string) {
    this.onFiltersChange({ ...this.filterState(), genre });
  }

  private fetchGames(state: FilterState) {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    const { platform, genre } = state;
    let request$;

    if (platform && genre) {
      request$ = this.gameService.getGamesByPlatformAndCategory(platform, genre);
    } else if (platform) {
      request$ = this.gameService.getGamesByPlatform(platform);
    } else if (genre) {
      request$ = this.gameService.getGamesByCategory(genre);
    } else {
      request$ = this.gameService.getAllGames();
    }

    request$.subscribe({
      next: (data) => {
        this.allGames.set(data);
        this.isLoading.set(false);
      },
      error: (error: Error) => {
        this.errorMessage.set(error.message);
        this.allGames.set([]);
        this.isLoading.set(false);
      },
    });
  }

  loadMore() {
    this.visibleCount.update((c) => c + this.pageSize);
  }

  clearFilters() {
    this.filterState.set({ platform: '', genre: '', search: '' });
    this.visibleCount.set(this.pageSize);
    this.loadGames();
  }

  retry() {
    this.fetchGames(this.filterState());
  }
}
