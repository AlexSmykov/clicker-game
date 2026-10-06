import { ExponentNumber } from 'exponential-number';

import {
  CostFormula,
  CostTier,
  ResolvedCostFormula,
  ResolvedCostTier,
  UpgradeCurrentCost,
  UpgradeDefinition,
} from './upgrade.type';

export function defineUpgrades<Key extends string>(
  upgrades: Record<Key, UpgradeDefinition<NoInfer<Key>>>,
): Record<Key, UpgradeDefinition<Key>> {
  return upgrades;
}

export function resolveCostTiers(upgradeName: string, tiers: CostTier[]): ResolvedCostTier[] {
  const resolvedTiers: ResolvedCostTier[] = [];
  let fromLevel = 0;

  for (const tier of tiers) {
    const previousTier = resolvedTiers.at(-1);

    resolvedTiers.push({
      fromLevel,
      levels: tier.levels,
      costs: tier.costs.map((cost) => ({
        resource: cost.resource,
        baseValue: resolveBaseValue(upgradeName, cost, previousTier),
        growth: cost.growth,
        growthValue: ExponentNumber.from(cost.growthValue),
      })),
    });

    fromLevel += tier.levels;
  }

  return resolvedTiers;
}

export function calculateCosts(
  tiers: ResolvedCostTier[],
  level: number,
  divider: ExponentNumber,
): UpgradeCurrentCost[] {
  const tier = tiers.find((item) => level < item.fromLevel + item.levels);

  if (!tier) {
    return [];
  }

  return tier.costs.map((cost) => ({
    resource: cost.resource,
    value: calculateCostValue(cost, level - tier.fromLevel).divide(divider),
  }));
}

function resolveBaseValue(
  upgradeName: string,
  cost: CostFormula,
  previousTier: ResolvedCostTier | undefined,
): ExponentNumber {
  if (cost.baseValue !== undefined) {
    return ExponentNumber.from(cost.baseValue);
  }

  const previousCost = previousTier?.costs.find((item) => item.resource === cost.resource);

  if (!previousTier || !previousCost) {
    throw new Error(
      `Upgrade "${upgradeName}" has no baseValue for "${cost.resource}" and no previous tier to continue from`,
    );
  }

  return calculateCostValue(previousCost, previousTier.levels);
}

function calculateCostValue(cost: ResolvedCostFormula, levelInTier: number): ExponentNumber {
  const growth = cost.growthValue.power(levelInTier);

  return cost.growth === 'multiply'
    ? cost.baseValue.multiply(growth)
    : cost.baseValue.power(growth);
}
