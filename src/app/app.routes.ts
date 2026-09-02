import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'jogos', pathMatch: 'full' },
  {
    path: 'jogos',
    loadComponent: () => import('./components/game-list/game-list.component').then(m => m.GameListComponent)
  },
  {
    path: 'em-alta',
    loadComponent: () => import('./components/trending/trending.component').then(m => m.TrendingComponent)
  },
  {
    path: 'configuracoes',
    loadComponent: () => import('./components/settings/settings.component').then(m => m.SettingsComponent)
  },
  {
    path: 'sobre',
    loadComponent: () => import('./components/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'game/:id',
    loadComponent: () => import('./components/game-detail/game-detail.component').then(m => m.GameDetailComponent)
  },
  { path: '**', redirectTo: 'jogos' }
];
