import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  @Output() platformSelected = new EventEmitter<string>();
  @Output() genreSelected = new EventEmitter<string>();

  platforms = ['pc', 'browser'];
  genres = ['shooter', 'strategy', 'mmorpg', 'sports'];

  onPlatformChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.platformSelected.emit(value);
  }

  onGenreChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.genreSelected.emit(value);
  }
}
