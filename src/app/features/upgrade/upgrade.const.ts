import { Upgrade, UpgradeCurrentData, UpgradeKey } from 'src/app/features/upgrade/upgrade.type';
import { ExponentNumber } from 'exponential-number';
import { RESOURCE_KEYS } from 'src/app/features/resource/resource.const';
import { SIMPLE_VALUE_CHANGE_KEYS } from 'src/app/core/consts/value-change.const';
import { PARAM_KEYS } from 'src/app/features/param/param.const';
import { transformCostToCurrentCosts } from 'src/app/features/upgrade/upgrade.utils';

export const UPGRADE_KEYS = {
  simpleMultiplier: 'simpleMultiplier',
} as const;

export const UPGRADE_DATA: Record<UpgradeKey, Upgrade> = {
  [UPGRADE_KEYS.simpleMultiplier]: {
    name: 'Simple multiplier',
    description: 'Add simple multiplier to your income',
    effects: [
      {
        paramKey: PARAM_KEYS.simpleClickMultiplier,
        change: {
          changeType: SIMPLE_VALUE_CHANGE_KEYS.plus,
          value: new ExponentNumber(0, 1),
        },
      },
    ],
    costs: [
      {
        startAtLevel: 0,
        resources: [
          {
            defaultValue: new ExponentNumber(0, 10),
            resource: RESOURCE_KEYS.money,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.multiply,
              value: new ExponentNumber(0, 2),
            },
          },
        ],
      },
    ],
  },
};

export const UPGRADE_CURRENT_DATA: Record<UpgradeKey, UpgradeCurrentData> = {
  [UPGRADE_KEYS.simpleMultiplier]: {
    costs: transformCostToCurrentCosts(UPGRADE_DATA[UPGRADE_KEYS.simpleMultiplier].costs),
    level: 0,
  },
} as const;
