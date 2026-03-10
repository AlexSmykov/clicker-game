import {
  ResourceCurrentData,
  ResourceData,
  ResourceKey,
} from 'src/app/features/resource/resource.type';
import { ExponentNumber } from 'exponential-number';

export const RESOURCE_KEYS = {
  money: 'money',
  crystalShards: 'crystalShards',
  crystals: 'crystals',
  rubyShards: 'rubyShards',
  rubies: 'rubies',
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
  [RESOURCE_KEYS.crystalShards]: {
    name: 'Crystal shards',
    icon: 'crystal-shards',
    color: '#99daff',
    isDefaultUnlocked: false,
    isResetOnPrestige: true,
  },
  [RESOURCE_KEYS.crystals]: {
    name: 'Crystals',
    icon: 'crystals',
    color: '#59d4ff',
    isDefaultUnlocked: false,
    isResetOnPrestige: true,
  },
  [RESOURCE_KEYS.rubyShards]: {
    name: 'Ruby shards',
    icon: 'ruby-shards',
    color: '#ed3c4d',
    isDefaultUnlocked: false,
    isResetOnPrestige: true,
  },
  [RESOURCE_KEYS.rubies]: {
    name: 'Rubies',
    icon: 'rubies',
    color: '#d12233',
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
  [RESOURCE_KEYS.crystalShards]: {
    isUnlocked: RESOURCE_DATA[RESOURCE_KEYS.crystalShards].isDefaultUnlocked,
    value: new ExponentNumber(0, 0),
  },
  [RESOURCE_KEYS.crystals]: {
    isUnlocked: RESOURCE_DATA[RESOURCE_KEYS.crystals].isDefaultUnlocked,
    value: new ExponentNumber(0, 0),
  },
  [RESOURCE_KEYS.rubyShards]: {
    isUnlocked: RESOURCE_DATA[RESOURCE_KEYS.rubyShards].isDefaultUnlocked,
    value: new ExponentNumber(0, 0),
  },
  [RESOURCE_KEYS.rubies]: {
    isUnlocked: RESOURCE_DATA[RESOURCE_KEYS.rubies].isDefaultUnlocked,
    value: new ExponentNumber(0, 0),
  },
  [RESOURCE_KEYS.prestigePoints]: {
    isUnlocked: RESOURCE_DATA[RESOURCE_KEYS.prestigePoints].isDefaultUnlocked,
    value: new ExponentNumber(0, 0),
  },
};
