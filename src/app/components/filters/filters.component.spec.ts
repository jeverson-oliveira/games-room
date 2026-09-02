import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { FiltersComponent } from './filters.component';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [FiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => localStorage.clear());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit platform change', () => {
    spyOn(component.filtersChange, 'emit');
    spyOn(component.platformSelected, 'emit');
    const select = { value: 'pc' } as HTMLSelectElement;
    component.onPlatformChange({ target: select } as unknown as Event);
    expect(component.platform()).toBe('pc');
    expect(component.platformSelected.emit).toHaveBeenCalledWith('pc');
    expect(component.filtersChange.emit).toHaveBeenCalledWith(
      jasmine.objectContaining({ platform: 'pc' }),
    );
  });

  it('should emit genre change', () => {
    spyOn(component.filtersChange, 'emit');
    const select = { value: 'shooter' } as HTMLSelectElement;
    component.onGenreChange({ target: select } as unknown as Event);
    expect(component.genre()).toBe('shooter');
    expect(component.filtersChange.emit).toHaveBeenCalled();
  });

  it('should debounce search', fakeAsync(() => {
    spyOn(component.filtersChange, 'emit');
    component.onSearchChange('Alpha');
    expect(component.filtersChange.emit).not.toHaveBeenCalled();
    tick(300);
    expect(component.filtersChange.emit).toHaveBeenCalledWith(
      jasmine.objectContaining({ search: 'alpha' }),
    );
  }));

  it('should clear filters', () => {
    spyOn(component.filtersChange, 'emit');
    component.platform.set('pc');
    component.genre.set('shooter');
    component.search.set('test');
    component.clearFilters();
    expect(component.platform()).toBe('');
    expect(component.genre()).toBe('');
    expect(component.search()).toBe('');
    expect(component.filtersChange.emit).toHaveBeenCalled();
  });

  it('should hasActiveFilters', () => {
    expect(component.hasActiveFilters()).toBeFalse();
    component.platform.set('pc');
    expect(component.hasActiveFilters()).toBeTrue();
  });

  it('should load defaults from localStorage', () => {
    localStorage.setItem('games-room:default-platform', 'browser');
    localStorage.setItem('games-room:default-genre', 'moba');
    const fixture2 = TestBed.createComponent(FiltersComponent);
    const comp2 = fixture2.componentInstance;
    fixture2.detectChanges();
    expect(comp2.platform()).toBe('browser');
    expect(comp2.genre()).toBe('moba');
  });
});
