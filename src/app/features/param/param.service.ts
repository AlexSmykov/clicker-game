import { computed, inject, Injectable } from '@angular/core';
import { ExponentNumber } from 'exponential-number';

import { mapKeys } from '../../core/utils/record.utils';
import { ResourceService } from '../resource/resource.service';
import { ResourceKey } from '../resource/resource.type';
import { StatService } from '../stat/stat.service';
import { StatKey } from '../stat/stat.type';
import { UpgradeStateService } from '../upgrade/upgrade-state.service';
import { PARAM_DATA, PARAM_KEYS } from './param.const';
import {
  Effect,
  EffectProvider,
  EffectSource,
  EffectValue,
  ParamData,
  ParamKey,
} from './param.type';

type ParamReader = (key: ParamKey) => ExponentNumber;

interface AppliedEffect {
  effect: Effect;
  source: EffectSource;
}

@Injectable({ providedIn: 'root' })
export class ParamService {
  readonly #resourceService = inject(ResourceService);
  readonly #statService = inject(StatService);
  readonly #providers: EffectProvider[] = [inject(UpgradeStateService)];

  readonly #effectsByParam = this.#groupEffectsByParam();

  readonly #readStat = (key: StatKey): ExponentNumber => this.#statService.value(key);

  readonly #readValue: ParamReader = (key) => this.value(key);

  readonly #readResource = (key: ResourceKey): ExponentNumber =>
    this.#resourceService.resourcesCurrentData()[key].value;

  readonly #values = mapKeys(PARAM_KEYS, (key) =>
    computed(() => this.#calculate(key, this.#readValue), {
      equal: (first, second) => first.isEqual(second),
    }),
  );

  readonly #dependents = this.#collectDependents();

  readonly #affectedParams = new Map<EffectSource, ParamKey[]>();

  public value(key: ParamKey): ExponentNumber {
    return this.#values[key]();
  }

  public affectedParams(source: EffectSource): ParamKey[] {
    const cached = this.#affectedParams.get(source);

    if (cached) {
      return cached;
    }

    const affected = new Set(source.effects.map((effect) => effect.param));

    for (const key of affected) {
      for (const dependent of this.#dependents[key]) {
        affected.add(dependent);
      }
    }

    const result = [...affected];

    this.#affectedParams.set(source, result);

    return result;
  }

  public preview(key: ParamKey, boostedSource: EffectSource): ExponentNumber {
    const affected = new Set(this.affectedParams(boostedSource));

    const read: ParamReader = (paramKey) =>
      affected.has(paramKey)
        ? this.#calculate(paramKey, read, boostedSource)
        : this.value(paramKey);

    return read(key);
  }

  #calculate(key: ParamKey, read: ParamReader, boostedSource?: EffectSource): ExponentNumber {
    let added = this.#baseValue(PARAM_DATA[key], read);
    let multiplier = ExponentNumber.ONE;
    let exponent = ExponentNumber.ONE;

    for (const { effect, source } of this.#effectsByParam[key]) {
      const level = source.level() + (source === boostedSource ? 1 : 0);

      if (level === 0) {
        continue;
      }

      const value = this.#resolve(effect.value, read);

      switch (effect.operation) {
        case 'add':
          added = added.plus(value.multiply(level));
          break;
        case 'multiply':
          multiplier = multiplier.multiply(value.power(level));
          break;
        case 'power':
          exponent = exponent.plus(value.multiply(level));
          break;
      }
    }

    return added.multiply(multiplier).power(exponent);
  }

  #baseValue(data: ParamData, read: ParamReader): ExponentNumber {
    return 'formula' in data
      ? data.formula({ param: read, resource: this.#readResource, stat: this.#readStat })
      : ExponentNumber.from(data.baseValue);
  }

  #resolve(value: EffectValue, read: ParamReader): ExponentNumber {
    return typeof value === 'object' ? read(value.param) : ExponentNumber.from(value);
  }

  #groupEffectsByParam(): Record<ParamKey, AppliedEffect[]> {
    const grouped = mapKeys(PARAM_KEYS, (): AppliedEffect[] => []);

    for (const provider of this.#providers) {
      for (const source of provider.effectSources) {
        for (const effect of source.effects) {
          grouped[effect.param].push({ effect, source });
        }
      }
    }

    return grouped;
  }

  #collectDependents(): Record<ParamKey, ParamKey[]> {
    const dependents = mapKeys(PARAM_KEYS, (): ParamKey[] => []);

    for (const key of PARAM_KEYS) {
      for (const dependency of this.#collectDependencies(key)) {
        dependents[dependency].push(key);
      }
    }

    return dependents;
  }

  #collectDependencies(key: ParamKey): Set<ParamKey> {
    const dependencies = new Set<ParamKey>();

    for (const { effect } of this.#effectsByParam[key]) {
      if (typeof effect.value === 'object') {
        dependencies.add(effect.value.param);
      }
    }

    return dependencies;
  }
}
