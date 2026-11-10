import { create } from 'zustand';
import { authStorage, storage, StorageKeys } from '../services/storage';
import { AuthState, User } from '../types/auth';

const getInitialUser = (): User | null => {
  const userJson = storage.getString(StorageKeys.USER_DATA);
  if (!userJson) return null;
  try {
    return JSON.parse(userJson) as User;
  } catch {
    return null;
  }
};

const initialToken = authStorage.getToken();
const initialUser = getInitialUser();

export const useAuthStore = create<AuthState>((set) => ({
  user: initialUser,
  token: initialToken,
  isAuthenticated: !!initialToken,
  isLoading: false,
  hasSeenOnboarding: authStorage.hasSeenOnboarding(),

  login: (user: User, token: string) => {
    authStorage.setToken(token);
    storage.set(StorageKeys.USER_DATA, JSON.stringify(user));
    set({
      user,
      token,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  logout: () => {
    authStorage.removeToken();
    storage.remove(StorageKeys.USER_DATA);
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  updateUser: (updatedFields: Partial<User>) => {
    set((state) => {
      if (!state.user) return state;
      const updatedUser = { ...state.user, ...updatedFields };
      storage.set(StorageKeys.USER_DATA, JSON.stringify(updatedUser));
      return { user: updatedUser };
    });
  },

  setHasSeenOnboarding: (value: boolean) => {
    authStorage.setHasSeenOnboarding(value);
    set({ hasSeenOnboarding: value });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
}));

