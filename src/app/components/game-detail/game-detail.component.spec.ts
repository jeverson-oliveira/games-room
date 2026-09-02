import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';

import { GameDetailComponent } from './game-detail.component';
import { GameService } from '../../services/game.service';
import { Game } from '../../models/game.model';

describe('GameDetailComponent', () => {
  let gameServiceSpy: jasmine.SpyObj<GameService>;
  let paramMapGetSpy: jasmine.Spy;

  const mockGame: Game = {
    id: 452,
    title: 'Detail Game',
    thumbnail: 'thumb.jpg',
    short_description: 'short',
    game_url: 'https://game',
    genre: 'shooter',
    platform: 'pc',
    publisher: 'Pub',
    developer: 'Dev',
    release_date: '2023-01-01',
    freetogame_profile_url: 'https://profile',
  };

  beforeEach(async () => {
    paramMapGetSpy = jasmine.createSpy('get');
    gameServiceSpy = jasmine.createSpyObj('GameService', ['getGameById']);

    await TestBed.configureTestingModule({
      imports: [GameDetailComponent],
      providers: [
        { provide: GameService, useValue: gameServiceSpy },
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: paramMapGetSpy } } } },
      ],
    }).compileComponents();
  });

  function createComponent() {
    const fixture = TestBed.createComponent(GameDetailComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    return { fixture, component };
  }

  it('should create and load game', () => {
    paramMapGetSpy.and.returnValue('452');
    gameServiceSpy.getGameById.and.returnValue(of(mockGame));
    const { component } = createComponent();
    expect(component).toBeTruthy();
    expect(gameServiceSpy.getGameById).toHaveBeenCalledWith(452);
    expect(component.game()?.title).toBe('Detail Game');
    expect(component.isLoading()).toBeFalse();
  });

  it('should handle invalid id', () => {
    paramMapGetSpy.and.returnValue(null);
    gameServiceSpy.getGameById.and.returnValue(of(mockGame));
    const { component } = createComponent();
    expect(component.errorMessage()).toBe('ID inválido.');
    expect(component.isLoading()).toBeFalse();
  });

  it('should handle error', () => {
    paramMapGetSpy.and.returnValue('1');
    gameServiceSpy.getGameById.and.returnValue(throwError(() => new Error('Not found')));
    const { component } = createComponent();
    expect(component.errorMessage()).toBe('Not found');
    expect(component.isLoading()).toBeFalse();
  });
});
