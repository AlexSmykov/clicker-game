import { keysOf } from '../../core/utils/record.utils';
import { ResourceData } from './resource.type';

export const RESOURCE_DATA = {
  money: {
    name: 'Money',
    iconPath: 'assets/icons/resources/money.svg',
    color: 'var(--color-resource-money)',
    isDefaultUnlocked: true,
    isResetOnPrestige: true,
  },
  crystalShards: {
    name: 'Crystal shards',
    iconPath: 'assets/icons/resources/crystal-shards.svg',
    color: 'var(--color-resource-crystal-shards)',
    isDefaultUnlocked: false,
    isResetOnPrestige: true,
  },
  crystals: {
    name: 'Crystals',
    iconPath: 'assets/icons/resources/crystals.svg',
    color: 'var(--color-resource-crystals)',
    isDefaultUnlocked: false,
    isResetOnPrestige: true,
  },
  rubyShards: {
    name: 'Ruby shards',
    iconPath: 'assets/icons/resources/ruby-shards.svg',
    color: 'var(--color-resource-ruby-shards)',
    isDefaultUnlocked: false,
    isResetOnPrestige: true,
  },
  rubies: {
    name: 'Rubies',
    iconPath: 'assets/icons/resources/rubies.svg',
    color: 'var(--color-resource-rubies)',
    isDefaultUnlocked: false,
    isResetOnPrestige: true,
  },
  prestigePoints: {
    name: 'Prestige points',
    iconPath: 'assets/icons/resources/prestige-points.svg',
    color: 'var(--color-resource-prestige-points)',
    isDefaultUnlocked: false,
    isResetOnPrestige: false,
  },
} satisfies Record<string, ResourceData>;

export const RESOURCE_KEYS = keysOf(RESOURCE_DATA);
