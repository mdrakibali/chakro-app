import { storage } from './storage';

export * from './storage';

export const StorageKeys = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  HAS_SEEN_ONBOARDING: 'has_seen_onboarding',
  THEME_MODE: 'theme_mode',
} as const;

export const authStorage = {
  getToken: (): string | null => {
    return storage.getString(StorageKeys.AUTH_TOKEN) ?? null;
  },

  setToken: (token: string): void => {
    storage.set(StorageKeys.AUTH_TOKEN, token);
  },

  removeToken: (): void => {
    storage.remove(StorageKeys.AUTH_TOKEN);
  },

  hasSeenOnboarding: (): boolean => {
    return storage.getBoolean(StorageKeys.HAS_SEEN_ONBOARDING) ?? false;
  },

  setHasSeenOnboarding: (value: boolean): void => {
    storage.set(StorageKeys.HAS_SEEN_ONBOARDING, value);
  },

  clearAll: (): void => {
    storage.clearAll();
  },
};

