# Games Room — GAMER.IO

Catálogo SPA de jogos free-to-play em **Angular 20** consumindo a [FreeToGame API](https://www.freetogame.com/api-doc). Filtros combináveis, busca com debounce, paginação, páginas em destaque e detalhes.

**Live:** https://jeverson-oliveira.github.io/games-room/ · **Repo:** https://github.com/jeverson-oliveira/games-room

![Angular](https://img.shields.io/badge/Angular-20-DD0031?logo=angular)
![Tests](https://img.shields.io/badge/tests-41%20passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ Features

- **Jogos** com filtros combináveis plataforma (`pc`/`browser`) + gênero (`shooter`, `moba`, `mmorpg`...) + busca por nome (debounce 300ms) + paginação 24/iteração
- **Em Alta** ordenado por `sort-by=popularity` via `GameService.getGamesSorted()`
- **Detalhe** `/game/:id` com screenshots, requisitos mínimos e links externos
- **Configurações** tema (`neon-dark`/`neon-light` via `data-theme`) e filtros padrão persistidos em `localStorage`
- **Sobre** stack e documentação da API
- Estados `loading` (spinner + skeleton), `error` (interceptor centralizado) e `empty` com `@if`/`@for` (`track game.id`) e `OnPush`
- Navegação lazy (`loadComponent`) com `RouterOutlet` + `404.html` fallback para GitHub Pages

## 🧱 Stack

Angular 20 (Standalone + Signals + Control Flow), RxJS 7, SCSS neon (Orbitron), HttpClient + `errorInterceptor`, `HttpParams`, Jasmine/Karma, ESLint (`angular-eslint`) + Prettier, GitHub Actions CI.

## 🚀 Quick Start

```bash
nvm use 22 # Node 20.19+ / 22.11+ / 24.3+ — Angular 20
npm ci
npm start          # ng serve --proxy-config proxy.conf.json → http://localhost:4200/
npm run build      # production → dist/games-room/browser
npm test           # ng test --watch=false --browsers=ChromeHeadless
npm run lint       # ng lint
npm run format     # prettier --write
npm run deploy     # build --base-href /games-room/ → docs/ + 404.html (Pages source: /docs)
```

Proxy dev `proxy.conf.json` → `https://www.freetogame.com` para `GET /api/games`. Em produção usa `src/environments/environment.prod.ts` com `apiUrl: 'https://www.freetogame.com/api'` via `fileReplacements`.

## 🔌 API

```
GET /api/games                          # lista
GET /api/games?platform=pc              # filtro plataforma
GET /api/games?category=shooter         # filtro gênero
GET /api/games?platform=pc&category=moba
GET /api/games?sort-by=popularity       # Em Alta
GET /api/game?id=452                    # detalhe
```

## 📁 Estrutura

```
src/app/
 ├─ models/game.model.ts
 ├─ services/game.service.ts
 ├─ interceptors/error.interceptor.ts
 ├─ components/{game-list,game-card,filters,trending,game-detail,settings,about}
 ├─ app.routes.ts (lazy)
 └─ app.component.ts (RouterOutlet + theme)
src/environments/{environment.ts,environment.prod.ts}
public/favicon.ico (neon gamepad)
```

## 🧪 Testes

41 specs (Jasmine/Karma): `GameService` (`HttpTestingController`), `GameList` (signals + paginação), `Filters` (debounce + localStorage), `Trending`, `GameDetail` (`ActivatedRoute` mock), `Settings`, `About`, `errorInterceptor`, `AppComponent`, `GameCard`. `ChromeHeadless` no CI.

## 📦 Deploy (GitHub Pages)

`angular.json` `outputPath dist/games-room` + `fileReplacements` prod. `npm run deploy` copia `dist/.../browser` → `docs/` + `cp index.html 404.html` + `touch .nojekyll`. Ative Pages em `Settings > Pages > Source: main /docs`.

## 📄 Licença

MIT
