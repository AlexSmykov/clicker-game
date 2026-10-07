import type { SETTING_DATA, SETTING_GROUP_DATA } from './setting.const';

export type SettingKey = keyof typeof SETTING_DATA;

export type SettingGroupKey = keyof typeof SETTING_GROUP_DATA;

export interface SettingGroupData {
  name: string;
}

export interface SettingDefinition<GroupKey extends string> {
  name: string;
  group: GroupKey;
  isOnByDefault: boolean;
}

export type SavedSettings = Partial<Record<string, boolean>>;
