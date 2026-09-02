import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [SettingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => localStorage.clear());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change theme and persist', () => {
    component.onThemeChange('neon-light');
    expect(component.theme()).toBe('neon-light');
    expect(localStorage.getItem('games-room:theme')).toBe('neon-light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('neon-light');
  });

  it('should change platform and persist', () => {
    component.onPlatformChange('pc');
    expect(component.defaultPlatform()).toBe('pc');
    expect(localStorage.getItem('games-room:default-platform')).toBe('pc');
  });

  it('should remove platform when empty', () => {
    localStorage.setItem('games-room:default-platform', 'pc');
    component.onPlatformChange('');
    expect(localStorage.getItem('games-room:default-platform')).toBeNull();
  });

  it('should clear storage', () => {
    localStorage.setItem('games-room:theme', 'neon-light');
    localStorage.setItem('games-room:default-platform', 'pc');
    component.clearStorage();
    expect(localStorage.getItem('games-room:theme')).toBeNull();
    expect(component.theme()).toBe('neon-dark');
  });

  it('should load stored values on init', () => {
    localStorage.setItem('games-room:theme', 'neon-light');
    localStorage.setItem('games-room:default-platform', 'browser');
    localStorage.setItem('games-room:default-genre', 'shooter');
    const fixture2 = TestBed.createComponent(SettingsComponent);
    const comp2 = fixture2.componentInstance;
    fixture2.detectChanges();
    expect(comp2.theme()).toBe('neon-light');
    expect(comp2.defaultPlatform()).toBe('browser');
    expect(comp2.defaultGenre()).toBe('shooter');
  });
});
