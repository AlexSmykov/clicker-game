import { ExponentNumber } from 'exponential-number';

import { ResourceKey } from '../resource/resource.type';
import {
  CostFormula,
  CostModifiers,
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
  const startValues = new Map<ResourceKey, ExponentNumber>();
  let fromLevel = 0;

  for (const tier of tiers) {
    const previousTier = resolvedTiers.at(-1);

    resolvedTiers.push({
      fromLevel,
      levels: tier.levels,
      costs: tier.costs.map((cost) => {
        const baseValue = resolveBaseValue(upgradeName, cost, previousTier);
        const startValue = startValues.get(cost.resource) ?? baseValue;

        startValues.set(cost.resource, startValue);

        return {
          resource: cost.resource,
          baseValue,
          startValue,
          growth: cost.growth,
          growthValue: ExponentNumber.from(cost.growthValue),
        };
      }),
    });

    fromLevel += tier.levels;
  }

  return resolvedTiers;
}

export function calculateCosts(
  tiers: ResolvedCostTier[],
  level: number,
  modifiers: CostModifiers,
): UpgradeCurrentCost[] {
  const tier = tiers.find((item) => level < item.fromLevel + item.levels);

  if (!tier) {
    return [];
  }

  return tier.costs.map((cost) => ({
    resource: cost.resource,
    value: applyStartCostModifiers(
      calculateCostValue(cost, level - tier.fromLevel),
      cost,
      modifiers,
    )
      .divide(modifiers.divider)
      .power(modifiers.power)
      .ceil(),
  }));
}

function applyStartCostModifiers(
  value: ExponentNumber,
  cost: ResolvedCostFormula,
  modifiers: CostModifiers,
): ExponentNumber {
  if (cost.resource !== 'money') {
    return value.multiply(modifiers.otherStartMultiplier);
  }

  if (cost.growth === 'power') {
    return value.power(modifiers.moneyStartPower);
  }

  return value.multiply(cost.startValue.power(modifiers.moneyStartPower.minus(1)));
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
  switch (cost.growth) {
    case 'add':
      return cost.baseValue.plus(cost.growthValue.multiply(levelInTier));
    case 'multiply':
      return cost.baseValue.multiply(cost.growthValue.power(levelInTier));
    case 'power':
      return cost.baseValue.power(cost.growthValue.power(levelInTier));
  }
}
