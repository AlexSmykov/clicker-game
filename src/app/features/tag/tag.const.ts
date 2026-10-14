import { keysOf } from '../../core/utils/record.utils';
import { TagData } from './tag.type';

export const TAG_DATA = {
  money: {
    name: 'Money',
    iconPath: 'assets/icons/resources/money.svg',
  },
  crystals: {
    name: 'Crystals',
    iconPath: 'assets/icons/resources/crystals.svg',
  },
  rubies: {
    name: 'Rubies',
    iconPath: 'assets/icons/resources/rubies.svg',
  },
  prestige: {
    name: 'Prestige',
    iconPath: 'assets/icons/resources/prestige-points.svg',
  },
  stardust: {
    name: 'Stardust',
    iconPath: 'assets/icons/resources/stardust.svg',
  },
} satisfies Record<string, TagData>;

export const TAG_KEYS = keysOf(TAG_DATA);
