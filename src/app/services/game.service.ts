import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game, GamePlatform, GameSortBy } from '../models/game.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GameService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.baseUrl}/games`);
  }

  getGamesByPlatform(platform: GamePlatform | string): Observable<Game[]> {
    const params = new HttpParams().set('platform', platform);
    return this.http.get<Game[]>(`${this.baseUrl}/games`, { params });
  }

  getGamesByCategory(category: string): Observable<Game[]> {
    const params = new HttpParams().set('category', category);
    return this.http.get<Game[]>(`${this.baseUrl}/games`, { params });
  }

  getGamesSorted(sortBy: GameSortBy): Observable<Game[]> {
    const params = new HttpParams().set('sort-by', sortBy);
    return this.http.get<Game[]>(`${this.baseUrl}/games`, { params });
  }

  getGamesByPlatformAndCategory(platform: string, category: string): Observable<Game[]> {
    const params = new HttpParams().set('platform', platform).set('category', category);
    return this.http.get<Game[]>(`${this.baseUrl}/games`, { params });
  }

  getGameById(id: number): Observable<Game> {
    const params = new HttpParams().set('id', String(id));
    return this.http.get<Game>(`${this.baseUrl}/game`, { params });
  }
}
