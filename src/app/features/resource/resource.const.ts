import { ResourceData, ResourceKey } from './resource.type';

export const RESOURCE_KEYS = [
  'money',
  'crystalShards',
  'crystals',
  'rubyShards',
  'rubies',
  'prestigePoints',
  'stardust',
] as const;

export const RESOURCE_DATA: Record<ResourceKey, ResourceData> = {
  money: {
    name: 'Money',
    iconPath: 'assets/icons/resources/money.svg',
    color: 'var(--color-resource-money)',
    isResetOnPrestige: true,
    unlockConditions: [],
  },
  crystalShards: {
    name: 'Crystal shards',
    iconPath: 'assets/icons/resources/crystal-shards.svg',
    color: 'var(--color-resource-crystal-shards)',
    isResetOnPrestige: true,
    unlockConditions: [{ type: 'treeNode', node: 'crystalShards' }],
  },
  crystals: {
    name: 'Crystals',
    iconPath: 'assets/icons/resources/crystals.svg',
    color: 'var(--color-resource-crystals)',
    isResetOnPrestige: true,
    unlockConditions: [{ type: 'treeNode', node: 'crystals' }],
  },
  rubyShards: {
    name: 'Ruby shards',
    iconPath: 'assets/icons/resources/ruby-shards.svg',
    color: 'var(--color-resource-ruby-shards)',
    isResetOnPrestige: true,
    unlockConditions: [{ type: 'treeNode', node: 'rubyShards' }],
  },
  rubies: {
    name: 'Rubies',
    iconPath: 'assets/icons/resources/rubies.svg',
    color: 'var(--color-resource-rubies)',
    isResetOnPrestige: true,
    unlockConditions: [{ type: 'treeNode', node: 'rubies' }],
  },
  prestigePoints: {
    name: 'Prestige points',
    iconPath: 'assets/icons/resources/prestige-points.svg',
    color: 'var(--color-resource-prestige-points)',
    isResetOnPrestige: false,
    unlockConditions: [{ type: 'treeNode', node: 'prestige' }],
  },
  stardust: {
    name: 'Stardust',
    iconPath: 'assets/icons/resources/stardust.svg',
    color: 'var(--color-resource-stardust)',
    isResetOnPrestige: false,
    unlockConditions: [{ type: 'treeNode', node: 'stardust' }],
  },
};
