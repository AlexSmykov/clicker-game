import { ObjectType } from 'src/app/core/types/common.type';
import { RESOURCE_KEYS } from 'src/app/features/resource/resource.const';

export type ResourceKey = ObjectType<typeof RESOURCE_KEYS>;

export type Resource = {
  name: string;
  icon: string;
};
