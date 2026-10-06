import type { TAG_DATA } from './tag.const';

export type TagKey = keyof typeof TAG_DATA;

export interface TagData {
  name: string;
  iconPath: string;
}
