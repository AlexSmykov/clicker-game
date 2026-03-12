import { ObjectType } from 'src/app/core/types/common.type';
import { SETTING_GROUP_KEYS, SETTING_KEYS } from 'src/app/features/setting/setting.const';

export type SettingKey = ObjectType<typeof SETTING_KEYS>;

export type SettingGroupKey = ObjectType<typeof SETTING_GROUP_KEYS>;

export type SettingData = {
  name: string;
  isOnByDefault: boolean;
};

export type SettingGroupData = {
  name: string;
};

export type SettingCurrentData = {
  isUnlocked: boolean;
  isOn: boolean;
};
