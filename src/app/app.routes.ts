import { Routes } from '@angular/router';
import { MAIN_ROUTE_ID, MAIN_ROUTES } from 'src/app/app.const';

export const routes: Routes = [
  {
    path: MAIN_ROUTE_ID,
    loadComponent: () => import('src/app/components/layout/layout.component'),
    children: [
      {
        path: MAIN_ROUTES.upgrades,
        loadComponent: () => import('src/app/pages/upgrades/upgrades.component'),
      },
    ],
  },
  {
    path: '**',
    redirectTo: MAIN_ROUTE_ID,
    pathMatch: 'full',
  },
];
