import { keysOf } from '../../core/utils/record.utils';
import { CRYSTAL_UPGRADES } from './groups/crystal.upgrades';
import { GEM_UPGRADES } from './groups/gem.upgrades';
import { LOGARITHM_UPGRADES } from './groups/logarithm.upgrades';
import { MONEY_UPGRADES } from './groups/money.upgrades';
import { PRESTIGE_UPGRADES } from './groups/prestige.upgrades';
import { RUBY_UPGRADES } from './groups/ruby.upgrades';
import { STARDUST_UPGRADES } from './groups/stardust.upgrades';
import { SYNERGY_UPGRADES } from './groups/synergy.upgrades';

export const UPGRADE_DATA = {
  ...MONEY_UPGRADES,
  ...CRYSTAL_UPGRADES,
  ...RUBY_UPGRADES,
  ...SYNERGY_UPGRADES,
  ...GEM_UPGRADES,
  ...LOGARITHM_UPGRADES,
  ...PRESTIGE_UPGRADES,
  ...STARDUST_UPGRADES,
};

export const UPGRADE_KEYS = keysOf(UPGRADE_DATA);
