import { Resource, ResourceKey } from 'src/app/features/resource/resource.type';
import { ExponentNumber } from 'exponential-number';

export const RESOURCE_KEYS = {
  money: 'money',
  crystal: 'crystal',
} as const;

export const RESOURCE_DATA: Record<ResourceKey, Resource> = {
  [RESOURCE_KEYS.money]: { name: 'Money', icon: '' },
  [RESOURCE_KEYS.crystal]: { name: 'Crystals', icon: '' },
};

export const RESOURCE_CURRENT_VALUES: Record<ResourceKey, ExponentNumber> = {
  [RESOURCE_KEYS.money]: new ExponentNumber(0, 0),
  [RESOURCE_KEYS.crystal]: new ExponentNumber(0, 0),
};
