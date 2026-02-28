import { ObjectType } from 'src/app/core/types/common.type';
import { RESOURCE_KEYS } from 'src/app/features/resource/resource.const';
import { ExponentNumber } from 'exponential-number';

export type ResourceKey = ObjectType<typeof RESOURCE_KEYS>;

export type ResourceData = {
  name: string;
  color: string;
  icon: string;
};

export type ResourceCurrentData = {
  isUnlocked: boolean;
  value: ExponentNumber;
};
