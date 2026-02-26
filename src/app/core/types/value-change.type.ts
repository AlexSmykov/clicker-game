import { ObjectType } from 'src/app/core/types/common.type';
import {
  NO_VALUE_CHANGE_KEYS,
  SIMPLE_VALUE_CHANGE_KEYS,
} from 'src/app/core/consts/value-change.const';
import { ParamKey } from 'src/app/features/param/param.type';
import { ExponentNumber } from 'exponential-number';

export type ValueChangeType = SimpleValueChangeType | NoValueChangeType;
export type ValueChange = SimpleValueChange | NoParamValueChange;

export type SimpleValueChangeType = ObjectType<typeof SIMPLE_VALUE_CHANGE_KEYS>;
export type NoValueChangeType = ObjectType<typeof NO_VALUE_CHANGE_KEYS>;

export type SimpleValueChange = {
  changeType: SimpleValueChangeType;
  value: ParamKey | ExponentNumber;
};

export type NoParamValueChange = {
  changeType: NoValueChangeType;
};
