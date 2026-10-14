import { keysOf } from '../../core/utils/record.utils';
import { SettingDefinition, SettingGroupData } from './setting.type';

export const SETTINGS_STORAGE_KEY = 'clicker-game-two-settings';

export const SETTING_GROUP_DATA = {
  common: { name: 'Common' },
  tree: { name: 'Upgrade tree' },
  develop: { name: 'Develop' },
} satisfies Record<string, SettingGroupData>;

export const SETTING_GROUP_KEYS = keysOf(SETTING_GROUP_DATA);

export const SETTING_DATA = {
  buyUpgradesByHold: {
    name: 'Buy upgrades by hold',
    group: 'common',
    isOnByDefault: true,
  },
  fastBuyUpgradesByHold: {
    name: 'Fast buy upgrades by hold',
    group: 'common',
    isOnByDefault: false,
  },
  showClickChances: {
    name: 'Show chances near the click button',
    group: 'common',
    isOnByDefault: true,
  },
  showCritEffect: {
    name: 'Show critical click effect',
    group: 'common',
    isOnByDefault: true,
  },
  autosave: {
    name: 'Save progress automatically',
    group: 'common',
    isOnByDefault: true,
  },
  hideTreeIcons: {
    name: 'Hide node icons',
    group: 'tree',
    isOnByDefault: false,
  },
  hideTreePaths: {
    name: 'Hide paths between nodes',
    group: 'tree',
    isOnByDefault: false,
  },
  freeUpgrades: {
    name: 'Free upgrades',
    group: 'develop',
    isOnByDefault: false,
  },
  freeTreeNodes: {
    name: 'Free tree nodes',
    group: 'develop',
    isOnByDefault: false,
  },
  showLockedUpgrades: {
    name: 'Show locked upgrades',
    group: 'develop',
    isOnByDefault: false,
  },
  showAllTreeNodes: {
    name: 'Show and allow to buy all tree nodes',
    group: 'develop',
    isOnByDefault: false,
  },
  offPrestigeBorder: {
    name: 'Off prestige border',
    group: 'develop',
    isOnByDefault: false,
  },
  keepEverythingOnPrestige: {
    name: 'Keep everything on prestige',
    group: 'develop',
    isOnByDefault: false,
  },
} satisfies Record<string, SettingDefinition<keyof typeof SETTING_GROUP_DATA>>;

export const SETTING_KEYS = keysOf(SETTING_DATA);
