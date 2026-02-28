import {
  ResourceCurrentData,
  ResourceData,
  ResourceKey,
} from 'src/app/features/resource/resource.type';
import { ExponentNumber } from 'exponential-number';

export const RESOURCE_KEYS = {
  money: 'money',
  crystal: 'crystal',
  prestigePoints: 'prestigePoints',
  ruby: 'ruby',
} as const;

export const RESOURCE_ICON_DIR_PATH = 'assets/icons/resources/';

export const RESOURCE_DATA: Record<ResourceKey, ResourceData> = {
  [RESOURCE_KEYS.money]: { name: 'Money', icon: 'money', color: '#ffcc00' },
  [RESOURCE_KEYS.crystal]: { name: 'Crystals', icon: 'crystal', color: '#59d4ff' },
  [RESOURCE_KEYS.prestigePoints]: { name: 'Prestige points', icon: 'prestige', color: '#dddddd' },
  [RESOURCE_KEYS.ruby]: { name: 'Rubies', icon: 'crystal', color: '#c81b2b' },
};

export const RESOURCE_CURRENT_VALUES: Record<ResourceKey, ResourceCurrentData> = {
  [RESOURCE_KEYS.money]: { isUnlocked: true, value: new ExponentNumber(0, 0) },
  [RESOURCE_KEYS.crystal]: { isUnlocked: true, value: new ExponentNumber(0, 0) },
  [RESOURCE_KEYS.prestigePoints]: { isUnlocked: false, value: new ExponentNumber(0, 0) },
  [RESOURCE_KEYS.ruby]: { isUnlocked: false, value: new ExponentNumber(0, 0) },
};
