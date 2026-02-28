import {
  ResourceCurrentData,
  ResourceData,
  ResourceKey,
} from 'src/app/features/resource/resource.type';
import { ExponentNumber } from 'exponential-number';

export const RESOURCE_KEYS = {
  money: 'money',
  crystal: 'crystal',
  ruby: 'ruby',
  prestigePoints: 'prestigePoints',
} as const;

export const RESOURCE_ICON_DIR_PATH = 'assets/icons/resources/';

export const RESOURCE_DATA: Record<ResourceKey, ResourceData> = {
  [RESOURCE_KEYS.money]: {
    name: 'Money',
    icon: 'money',
    color: '#ffcc00',
    isDefaultUnlocked: true,
    isResetOnPrestige: true,
  },
  [RESOURCE_KEYS.crystal]: {
    name: 'Crystals',
    icon: 'crystal',
    color: '#59d4ff',
    isDefaultUnlocked: true,
    isResetOnPrestige: true,
  },
  [RESOURCE_KEYS.ruby]: {
    name: 'Rubies',
    icon: 'crystal',
    color: '#c81b2b',
    isDefaultUnlocked: false,
    isResetOnPrestige: true,
  },
  [RESOURCE_KEYS.prestigePoints]: {
    name: 'Prestige points',
    icon: 'prestige',
    color: '#afafaf',
    isDefaultUnlocked: false,
    isResetOnPrestige: false,
  },
};

export const RESOURCE_CURRENT_VALUES: Record<ResourceKey, ResourceCurrentData> = {
  [RESOURCE_KEYS.money]: {
    isUnlocked: RESOURCE_DATA[RESOURCE_KEYS.money].isDefaultUnlocked,
    value: new ExponentNumber(0, 0),
  },
  [RESOURCE_KEYS.crystal]: {
    isUnlocked: RESOURCE_DATA[RESOURCE_KEYS.crystal].isDefaultUnlocked,
    value: new ExponentNumber(0, 0),
  },
  [RESOURCE_KEYS.ruby]: {
    isUnlocked: RESOURCE_DATA[RESOURCE_KEYS.ruby].isDefaultUnlocked,
    value: new ExponentNumber(0, 0),
  },
  [RESOURCE_KEYS.prestigePoints]: {
    isUnlocked: RESOURCE_DATA[RESOURCE_KEYS.prestigePoints].isDefaultUnlocked,
    value: new ExponentNumber(0, 0),
  },
};
