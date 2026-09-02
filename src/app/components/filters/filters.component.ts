import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface FilterState {
  platform: string;
  genre: string;
  search: string;
}

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  @Input() initialPlatform = '';
  @Input() initialGenre = '';
  @Output() filtersChange = new EventEmitter<FilterState>();

  // kept for backwards compat (deprecated)
  @Output() platformSelected = new EventEmitter<string>();
  @Output() genreSelected = new EventEmitter<string>();

  platforms = ['pc', 'browser'];
  genres = ['shooter', 'strategy', 'mmorpg', 'sports', 'racing', 'moba', 'survival', 'action'];

  platform = signal('');
  genre = signal('');
  search = signal('');

  private searchDebounce?: ReturnType<typeof setTimeout>;

  ngOnInit() {
    const storedPlatform = this.initialPlatform || localStorage.getItem('games-room:default-platform') || '';
    const storedGenre = this.initialGenre || localStorage.getItem('games-room:default-genre') || '';
    this.platform.set(storedPlatform);
    this.genre.set(storedGenre);
    if (storedPlatform || storedGenre) {
      this.emitCombined();
    }
  }

  onPlatformChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.platform.set(value);
    this.platformSelected.emit(value);
    this.emitCombined();
  }

  onGenreChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.genre.set(value);
    this.genreSelected.emit(value);
    this.emitCombined();
  }

  onSearchChange(value: string): void {
    this.search.set(value);
    if (this.searchDebounce) clearTimeout(this.searchDebounce);
    this.searchDebounce = setTimeout(() => this.emitCombined(), 300);
  }

  clearFilters(): void {
    this.platform.set('');
    this.genre.set('');
    this.search.set('');
    this.emitCombined();
  }

  hasActiveFilters(): boolean {
    return !!(this.platform() || this.genre() || this.search());
  }

  private emitCombined(): void {
    this.filtersChange.emit({
      platform: this.platform(),
      genre: this.genre(),
      search: this.search().trim().toLowerCase()
    });
  }
}
