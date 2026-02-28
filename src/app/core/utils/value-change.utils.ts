import { ExponentNumber } from 'exponential-number';
import { ValueChange, ValueChangeType } from 'src/app/core/types/value-change.type';
import {
  NO_VALUE_CHANGE_KEYS,
  SIMPLE_VALUE_CHANGE_KEYS,
} from 'src/app/core/consts/value-change.const';
import { ParamCurrentValues } from 'src/app/features/param/param.type';
import { exhaustedMap } from 'src/app/core/utils/common.utils';

export function changeParamValue(
  value: ExponentNumber,
  changes: ValueChange,
  paramCurrentValues: ParamCurrentValues,
): ExponentNumber {
  switch (changes.changeType) {
    case SIMPLE_VALUE_CHANGE_KEYS.plus:
      return value.plus(
        typeof changes.value === 'string' ? paramCurrentValues[changes.value].value : changes.value,
      );

    case SIMPLE_VALUE_CHANGE_KEYS.minus:
      return value.minus(
        typeof changes.value === 'string' ? paramCurrentValues[changes.value].value : changes.value,
      );

    case SIMPLE_VALUE_CHANGE_KEYS.multiply:
      return value.multiply(
        typeof changes.value === 'string' ? paramCurrentValues[changes.value].value : changes.value,
      );

    case SIMPLE_VALUE_CHANGE_KEYS.divide:
      return value.divide(
        typeof changes.value === 'string' ? paramCurrentValues[changes.value].value : changes.value,
      );

    case SIMPLE_VALUE_CHANGE_KEYS.power:
      return value.power(
        typeof changes.value === 'string' ? paramCurrentValues[changes.value].value : changes.value,
      );

    case SIMPLE_VALUE_CHANGE_KEYS.root:
      return value.root(
        typeof changes.value === 'string' ? paramCurrentValues[changes.value].value : changes.value,
      );

    case SIMPLE_VALUE_CHANGE_KEYS.log:
      return value.log(
        typeof changes.value === 'string' ? paramCurrentValues[changes.value].value : changes.value,
      );

    case NO_VALUE_CHANGE_KEYS.sqrt:
      return value.sqrt();

    case NO_VALUE_CHANGE_KEYS.log10:
      return value.log10();

    default:
      exhaustedMap(changes);
  }
}

export function changeValue(
  value: ExponentNumber,
  changeType: ValueChangeType,
  changeValue: ExponentNumber | undefined,
): ExponentNumber {
  switch (changeType) {
    case SIMPLE_VALUE_CHANGE_KEYS.plus:
      return changeValue ? value.plus(changeValue) : value;

    case SIMPLE_VALUE_CHANGE_KEYS.minus:
      return changeValue ? value.minus(changeValue) : value;

    case SIMPLE_VALUE_CHANGE_KEYS.multiply:
      return changeValue ? value.multiply(changeValue) : value;

    case SIMPLE_VALUE_CHANGE_KEYS.divide:
      return changeValue ? value.divide(changeValue) : value;

    case SIMPLE_VALUE_CHANGE_KEYS.power:
      return changeValue ? value.power(changeValue) : value;

    case SIMPLE_VALUE_CHANGE_KEYS.root:
      return changeValue ? value.root(changeValue) : value;

    case SIMPLE_VALUE_CHANGE_KEYS.log:
      return changeValue ? value.log(changeValue) : value;

    case NO_VALUE_CHANGE_KEYS.sqrt:
      return value.sqrt();

    case NO_VALUE_CHANGE_KEYS.log10:
      return value.log10();

    default:
      exhaustedMap(changeType);
  }
}
