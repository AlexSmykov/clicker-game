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
  [MAIN_ROUTE_IDS.upgrades]: { name: 'Upgrades', iconPath: '' },
  [MAIN_ROUTE_IDS.prestige]: { name: 'Prestige', iconPath: '' },
  [MAIN_ROUTE_IDS.statistics]: { name: 'Statistics', iconPath: '' },
  [MAIN_ROUTE_IDS.unlocks]: { name: 'Unlocks', iconPath: '' },
  [MAIN_ROUTE_IDS.settings]: { name: 'Settings', iconPath: '' },
};
