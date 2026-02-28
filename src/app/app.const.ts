import { MainRoute, MainRouteData } from 'src/app/app.type';

export const ROOT_ROUTE_ID = 'main';

export const MAIN_ROUTE_IDS = {
  upgrades: 'upgrades',
  prestige: 'prestige',
  statistics: 'statistics',
  unlocks: 'unlocks',
  settings: 'settings',
};

export const MAIN_ROUTE_DATA: Record<MainRoute, MainRouteData> = {
  [MAIN_ROUTE_IDS.upgrades]: { name: 'Upgrades', iconPath: 'assets/icons/pages/upgrades.svg' },
  [MAIN_ROUTE_IDS.prestige]: { name: 'Prestige', iconPath: 'assets/icons/pages/prestige.svg' },
  [MAIN_ROUTE_IDS.statistics]: {
    name: 'Statistics',
    iconPath: 'assets/icons/pages/statistics.svg',
  },
  [MAIN_ROUTE_IDS.unlocks]: { name: 'Unlocks', iconPath: 'assets/icons/pages/unlocks.svg' },
  [MAIN_ROUTE_IDS.settings]: { name: 'Settings', iconPath: 'assets/icons/pages/settings.svg' },
};
