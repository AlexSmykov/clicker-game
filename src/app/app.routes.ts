import { Routes } from '@angular/router';
import { MAIN_ROUTE_IDS, ROOT_ROUTE_ID } from 'src/app/app.const';

export const routes: Routes = [
  {
    path: ROOT_ROUTE_ID,
    loadComponent: () => import('src/app/components/layout/layout.component'),
    children: [
      {
        title: 'Clicker game | Upgrades',
        path: MAIN_ROUTE_IDS.upgrades,
        loadComponent: () => import('src/app/pages/upgrades/upgrades.component'),
      },
      {
        title: 'Clicker game | Prestige',
        path: MAIN_ROUTE_IDS.prestige,
        loadComponent: () => import('src/app/pages/prestige/prestige.component'),
      },
      {
        title: 'Clicker game | Unlocks',
        path: MAIN_ROUTE_IDS.unlocks,
        loadComponent: () => import('src/app/pages/unlocks/unlocks.component'),
      },
      {
        title: 'Clicker game | Statistics',
        path: MAIN_ROUTE_IDS.statistics,
        loadComponent: () => import('src/app/pages/statistics/statistics.component'),
      },
      {
        title: 'Clicker game | Settings',
        path: MAIN_ROUTE_IDS.settings,
        loadComponent: () => import('src/app/pages/settings/settings.component'),
      },
      {
        path: '',
        redirectTo: MAIN_ROUTE_IDS.upgrades,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: ROOT_ROUTE_ID,
    pathMatch: 'full',
  },
];
