import {
  SettingCurrentData,
  SettingData,
  SettingGroupData,
  SettingGroupKey,
  SettingKey,
} from 'src/app/features/setting/setting.type';

export const SETTING_KEYS = {
  showParametersWidget: 'showParametersWidget',
  buyUpgradesByHold: 'buyUpgradesByHold',
  fastBuyUpgradesByHold: 'fastBuyUpgradesByHold',
  scrollInsideContentArea: 'scrollInsideContentArea',
  saveOnPageReload: 'saveOnPageReload',
  freeUnlocks: 'freeUnlocks',
  freeUpgrades: 'freeUpgrades',
  unlockedUpgradesAutomatization: 'unlockedUpgradesAutomatization',
  offPrestigeBorder: 'offPrestigeBorder',
  hideUnlockIcons: 'hideUnlockIcons',
  hideUnlockPaths: 'hideUnlockPaths',
  keepEverythingOnPrestige: 'keepEverythingOnPrestige',
  showAllParams: 'showAllParams',
} as const;

export const SETTING_GROUP_KEYS = {
  common: 'common',
  dev: 'dev',
} as const;

export const SETTING_DATA: Record<SettingKey, SettingData> = {
  showParametersWidget: {
    name: 'Show parameters widget',
    isOnByDefault: true,
  },
  buyUpgradesByHold: {
    name: 'Buy upgrades by hold',
    isOnByDefault: true,
  },
  fastBuyUpgradesByHold: {
    name: 'Fast buy upgrades by hold',
    isOnByDefault: false,
  },
  scrollInsideContentArea: {
    name: 'Scroll inside content area',
    isOnByDefault: false,
  },
  saveOnPageReload: {
    name: 'Save progress on page reload',
    isOnByDefault: true,
  },
  freeUnlocks: {
    name: 'Free unlocks',
    isOnByDefault: false,
  },
  freeUpgrades: {
    name: ' Free upgrades',
    isOnByDefault: false,
  },
  unlockedUpgradesAutomatization: {
    name: 'Unlocked upgrades automatization',
    isOnByDefault: false,
  },
  offPrestigeBorder: {
    name: 'Off prestige Border',
    isOnByDefault: false,
  },
  hideUnlockIcons: {
    name: 'Hide unlock icons',
    isOnByDefault: false,
  },
  hideUnlockPaths: {
    name: 'Hide unlock paths',
    isOnByDefault: false,
  },
  keepEverythingOnPrestige: {
    name: 'Keep Everything on Prestige',
    isOnByDefault: false,
  },
  showAllParams: {
    name: 'Show all params',
    isOnByDefault: false,
  },
};

export const SETTING_GROUP_MAP: Record<SettingGroupKey, SettingKey[]> = {
  common: [
    SETTING_KEYS.showParametersWidget,
    SETTING_KEYS.buyUpgradesByHold,
    SETTING_KEYS.fastBuyUpgradesByHold,
    SETTING_KEYS.scrollInsideContentArea,
    SETTING_KEYS.saveOnPageReload,
  ],
  dev: [
    SETTING_KEYS.freeUnlocks,
    SETTING_KEYS.freeUpgrades,
    SETTING_KEYS.unlockedUpgradesAutomatization,
    SETTING_KEYS.offPrestigeBorder,
    SETTING_KEYS.hideUnlockIcons,
    SETTING_KEYS.hideUnlockPaths,
    SETTING_KEYS.keepEverythingOnPrestige,
    SETTING_KEYS.showAllParams,
  ],
};

export const SETTING_GROUP_DATA: Record<SettingGroupKey, SettingGroupData> = {
  common: {
    name: 'Common',
  },
  dev: {
    name: 'Develop',
  },
};

export const SETTING_CURRENT_DATA: Record<SettingKey, SettingCurrentData> = {
  showParametersWidget: {
    isUnlocked: true,
    isOn: SETTING_DATA[SETTING_KEYS.showParametersWidget].isOnByDefault,
  },
  buyUpgradesByHold: {
    isUnlocked: true,
    isOn: SETTING_DATA[SETTING_KEYS.buyUpgradesByHold].isOnByDefault,
  },
  fastBuyUpgradesByHold: {
    isUnlocked: true,
    isOn: SETTING_DATA[SETTING_KEYS.fastBuyUpgradesByHold].isOnByDefault,
  },
  scrollInsideContentArea: {
    isUnlocked: true,
    isOn: SETTING_DATA[SETTING_KEYS.scrollInsideContentArea].isOnByDefault,
  },
  saveOnPageReload: {
    isUnlocked: true,
    isOn: SETTING_DATA[SETTING_KEYS.saveOnPageReload].isOnByDefault,
  },
  freeUnlocks: {
    isUnlocked: true,
    isOn: SETTING_DATA[SETTING_KEYS.freeUnlocks].isOnByDefault,
  },
  freeUpgrades: {
    isUnlocked: true,
    isOn: SETTING_DATA[SETTING_KEYS.freeUpgrades].isOnByDefault,
  },
  unlockedUpgradesAutomatization: {
    isUnlocked: true,
    isOn: SETTING_DATA[SETTING_KEYS.unlockedUpgradesAutomatization].isOnByDefault,
  },
  offPrestigeBorder: {
    isUnlocked: true,
    isOn: SETTING_DATA[SETTING_KEYS.offPrestigeBorder].isOnByDefault,
  },
  hideUnlockIcons: {
    isUnlocked: true,
    isOn: SETTING_DATA[SETTING_KEYS.hideUnlockIcons].isOnByDefault,
  },
  hideUnlockPaths: {
    isUnlocked: true,
    isOn: SETTING_DATA[SETTING_KEYS.hideUnlockPaths].isOnByDefault,
  },
  keepEverythingOnPrestige: {
    isUnlocked: true,
    isOn: SETTING_DATA[SETTING_KEYS.keepEverythingOnPrestige].isOnByDefault,
  },
  showAllParams: {
    isUnlocked: true,
    isOn: SETTING_DATA[SETTING_KEYS.showAllParams].isOnByDefault,
  },
};
