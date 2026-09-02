import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';

import { GameListComponent } from './game-list.component';
import { GameService } from '../../services/game.service';
import { Game } from '../../models/game.model';

describe('GameListComponent', () => {
  let component: GameListComponent;
  let fixture: ComponentFixture<GameListComponent>;
  let gameServiceSpy: jasmine.SpyObj<GameService>;

  const mockGames: Game[] = [
    {
      id: 1,
      title: 'Alpha',
      thumbnail: 'a.jpg',
      short_description: 'desc',
      game_url: 'https://a',
      genre: 'shooter',
      platform: 'pc',
      publisher: 'Pub',
      developer: 'Dev',
      release_date: '2023-01-01',
      freetogame_profile_url: 'https://a',
    },
    {
      id: 2,
      title: 'Beta',
      thumbnail: 'b.jpg',
      short_description: 'desc',
      game_url: 'https://b',
      genre: 'strategy',
      platform: 'browser',
      publisher: 'Pub',
      developer: 'Dev',
      release_date: '2023-01-01',
      freetogame_profile_url: 'https://b',
    },
  ];

  beforeEach(async () => {
    gameServiceSpy = jasmine.createSpyObj('GameService', [
      'getAllGames',
      'getGamesByPlatform',
      'getGamesByCategory',
      'getGamesByPlatformAndCategory',
    ]);
    gameServiceSpy.getAllGames.and.returnValue(of(mockGames));

    await TestBed.configureTestingModule({
      imports: [GameListComponent],
      providers: [
        { provide: GameService, useValue: gameServiceSpy },
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GameListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load games on init', () => {
    fixture.detectChanges();
    expect(gameServiceSpy.getAllGames).toHaveBeenCalled();
    expect(component.games().length).toBe(2);
  });

  it('should handle error', () => {
    gameServiceSpy.getAllGames.and.returnValue(throwError(() => new Error('Network error')));
    fixture.detectChanges();
    expect(component.errorMessage()).toBe('Network error');
    expect(component.games().length).toBe(0);
  });

  it('should filter by search client-side', () => {
    fixture.detectChanges();
    component.onFiltersChange({ platform: '', genre: '', search: 'alpha' });
    expect(component.filteredGames().length).toBe(1);
    expect(component.filteredGames()[0].title).toBe('Alpha');
  });

  it('should paginate', () => {
    fixture.detectChanges();
    expect(component.visibleCount()).toBe(24);
    component.loadMore();
    expect(component.visibleCount()).toBe(48);
  });
});
