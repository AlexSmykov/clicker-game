import { LOCAL_STORAGE_KEYS } from 'src/app/core/services/local-storage/local-storage.const';

export type LocalStorageKey = (typeof LOCAL_STORAGE_KEYS)[keyof typeof LOCAL_STORAGE_KEYS];
