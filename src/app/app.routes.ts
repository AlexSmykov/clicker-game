import { Routes } from '@angular/router';

import { MAIN_ROUTE_DATA, MAIN_ROUTE_IDS } from './app.const';

export const routes: Routes = [
  {
    title: MAIN_ROUTE_DATA[MAIN_ROUTE_IDS.upgrades].name,
    path: MAIN_ROUTE_IDS.upgrades,
    loadComponent: () => import('./pages/upgrades/upgrades'),
  },
  {
    title: MAIN_ROUTE_DATA[MAIN_ROUTE_IDS.upgradeTree].name,
    path: MAIN_ROUTE_IDS.upgradeTree,
    loadComponent: () => import('./pages/upgrade-tree/upgrade-tree'),
  },
  {
    title: MAIN_ROUTE_DATA[MAIN_ROUTE_IDS.prestige].name,
    path: MAIN_ROUTE_IDS.prestige,
    loadComponent: () => import('./pages/prestige/prestige'),
  },
  {
    title: MAIN_ROUTE_DATA[MAIN_ROUTE_IDS.modifiers].name,
    path: MAIN_ROUTE_IDS.modifiers,
    loadComponent: () => import('./pages/modifiers/modifiers'),
  },
  {
    title: MAIN_ROUTE_DATA[MAIN_ROUTE_IDS.statistics].name,
    path: MAIN_ROUTE_IDS.statistics,
    loadComponent: () => import('./pages/statistics/statistics'),
  },
  {
    title: MAIN_ROUTE_DATA[MAIN_ROUTE_IDS.settings].name,
    path: MAIN_ROUTE_IDS.settings,
    loadComponent: () => import('./pages/settings/settings'),
  },
  {
    path: '**',
    redirectTo: MAIN_ROUTE_IDS.upgrades,
  },
];
