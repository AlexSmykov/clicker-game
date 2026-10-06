import { ObjectType } from './core/types/common.type';

export const MAIN_ROUTE_IDS = {
  upgrades: 'upgrades',
  upgradeTree: 'upgrade-tree',
  prestige: 'prestige',
  statistics: 'statistics',
  settings: 'settings',
} as const;

export type MainRoute = ObjectType<typeof MAIN_ROUTE_IDS>;

export interface MainRouteData {
  name: string;
  iconPath: string;
}

export const MAIN_ROUTE_DATA: Record<MainRoute, MainRouteData> = {
  [MAIN_ROUTE_IDS.upgrades]: { name: 'Upgrades', iconPath: 'assets/icons/pages/upgrades.svg' },
  [MAIN_ROUTE_IDS.upgradeTree]: {
    name: 'Upgrade tree',
    iconPath: 'assets/icons/pages/upgrade-tree.svg',
  },
  [MAIN_ROUTE_IDS.prestige]: { name: 'Prestige', iconPath: 'assets/icons/pages/prestige.svg' },
  [MAIN_ROUTE_IDS.statistics]: {
    name: 'Statistics',
    iconPath: 'assets/icons/pages/statistics.svg',
  },
  [MAIN_ROUTE_IDS.settings]: { name: 'Settings', iconPath: 'assets/icons/pages/settings.svg' },
};
