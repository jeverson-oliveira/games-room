import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';

import { TrendingComponent } from './trending.component';
import { GameService } from '../../services/game.service';
import { Game } from '../../models/game.model';

describe('TrendingComponent', () => {
  let component: TrendingComponent;
  let fixture: ComponentFixture<TrendingComponent>;
  let gameServiceSpy: jasmine.SpyObj<GameService>;

  const mockGames: Game[] = [
    {
      id: 1,
      title: 'Popular',
      thumbnail: 'p.jpg',
      short_description: 'desc',
      game_url: 'https://p',
      genre: 'shooter',
      platform: 'pc',
      publisher: 'Pub',
      developer: 'Dev',
      release_date: '2023-01-01',
      freetogame_profile_url: 'https://p',
    },
  ];

  beforeEach(async () => {
    gameServiceSpy = jasmine.createSpyObj('GameService', ['getGamesSorted']);
    gameServiceSpy.getGamesSorted.and.returnValue(of(mockGames));

    await TestBed.configureTestingModule({
      imports: [TrendingComponent],
      providers: [
        { provide: GameService, useValue: gameServiceSpy },
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TrendingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load trending games sorted by popularity', () => {
    fixture.detectChanges();
    expect(gameServiceSpy.getGamesSorted).toHaveBeenCalledWith('popularity');
    expect(component.games().length).toBe(1);
    expect(component.isLoading()).toBeFalse();
  });

  it('should handle error', () => {
    gameServiceSpy.getGamesSorted.and.returnValue(throwError(() => new Error('fail')));
    fixture.detectChanges();
    expect(component.errorMessage()).toBe('fail');
    expect(component.isLoading()).toBeFalse();
  });

  it('should retry', () => {
    fixture.detectChanges();
    gameServiceSpy.getGamesSorted.calls.reset();
    component.retry();
    expect(gameServiceSpy.getGamesSorted).toHaveBeenCalled();
  });
});
