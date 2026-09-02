import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { GameService } from './game.service';
import { Game } from '../models/game.model';

describe('GameService', () => {
  let service: GameService;
  let httpMock: HttpTestingController;

  const mockGames: Game[] = [
    {
      id: 1,
      title: 'Test Game',
      thumbnail: 'thumb.jpg',
      short_description: 'desc',
      game_url: 'https://example.com',
      genre: 'shooter',
      platform: 'pc',
      publisher: 'Pub',
      developer: 'Dev',
      release_date: '2023-01-01',
      freetogame_profile_url: 'https://example.com/profile',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(GameService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all games', () => {
    service.getAllGames().subscribe((games) => expect(games).toEqual(mockGames));
    const req = httpMock.expectOne('/api/games');
    expect(req.request.method).toBe('GET');
    req.flush(mockGames);
  });

  it('should fetch games by platform with HttpParams', () => {
    service.getGamesByPlatform('pc').subscribe((games) => expect(games).toEqual(mockGames));
    const req = httpMock.expectOne(
      (r) => r.url === '/api/games' && r.params.get('platform') === 'pc',
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockGames);
  });

  it('should fetch games by category', () => {
    service.getGamesByCategory('shooter').subscribe((games) => expect(games).toEqual(mockGames));
    const req = httpMock.expectOne(
      (r) => r.url === '/api/games' && r.params.get('category') === 'shooter',
    );
    req.flush(mockGames);
  });

  it('should fetch games sorted', () => {
    service.getGamesSorted('popularity').subscribe((games) => expect(games).toEqual(mockGames));
    const req = httpMock.expectOne((r) => r.params.get('sort-by') === 'popularity');
    req.flush(mockGames);
  });

  it('should fetch game by id', () => {
    service.getGameById(1).subscribe((game) => expect(game).toEqual(mockGames[0]));
    const req = httpMock.expectOne((r) => r.url === '/api/game' && r.params.get('id') === '1');
    req.flush(mockGames[0]);
  });
});
