import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Theme = 'neon-dark' | 'neon-light';
const THEME_KEY = 'games-room:theme';
const DEFAULT_PLATFORM_KEY = 'games-room:default-platform';
const DEFAULT_GENRE_KEY = 'games-room:default-genre';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
  theme = signal<Theme>('neon-dark');
  defaultPlatform = signal<string>('');
  defaultGenre = signal<string>('');
  saved = signal(false);

  platforms = ['', 'pc', 'browser'];
  genres = ['', 'shooter', 'strategy', 'mmorpg', 'sports', 'racing', 'moba'];

  ngOnInit() {
    const storedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
    if (storedTheme) this.theme.set(storedTheme);
    this.applyTheme(this.theme());

    this.defaultPlatform.set(localStorage.getItem(DEFAULT_PLATFORM_KEY) || '');
    this.defaultGenre.set(localStorage.getItem(DEFAULT_GENRE_KEY) || '');
  }

  onThemeChange(value: Theme) {
    this.theme.set(value);
    this.applyTheme(value);
    localStorage.setItem(THEME_KEY, value);
    this.flashSaved();
  }

  onPlatformChange(value: string) {
    this.defaultPlatform.set(value);
    if (value) localStorage.setItem(DEFAULT_PLATFORM_KEY, value);
    else localStorage.removeItem(DEFAULT_PLATFORM_KEY);
    this.flashSaved();
  }

  onGenreChange(value: string) {
    this.defaultGenre.set(value);
    if (value) localStorage.setItem(DEFAULT_GENRE_KEY, value);
    else localStorage.removeItem(DEFAULT_GENRE_KEY);
    this.flashSaved();
  }

  clearStorage() {
    localStorage.removeItem(THEME_KEY);
    localStorage.removeItem(DEFAULT_PLATFORM_KEY);
    localStorage.removeItem(DEFAULT_GENRE_KEY);
    this.theme.set('neon-dark');
    this.defaultPlatform.set('');
    this.defaultGenre.set('');
    this.applyTheme('neon-dark');
    this.flashSaved();
  }

  private applyTheme(theme: Theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  private flashSaved() {
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 1500);
  }
}
