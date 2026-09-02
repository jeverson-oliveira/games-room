import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCardComponent } from './game-card.component';

describe('GameCardComponent', () => {
  let component: GameCardComponent;
  let fixture: ComponentFixture<GameCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GameCardComponent);
    component = fixture.componentInstance;
    component.game = {
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
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
