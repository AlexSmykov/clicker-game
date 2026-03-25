import { UpgradeCost, UpgradeCurrentCost } from 'src/app/features/upgrade/upgrade.type';

export function transformCostToCurrentCosts(costs: UpgradeCost[]): UpgradeCurrentCost[] {
  return costs[0].resources.map((cost) => {
    return {
      value: cost.defaultValue,
      resource: cost.resource,
    };
  });
}
