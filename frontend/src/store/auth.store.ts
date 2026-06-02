import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Role } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  role: Role | null;
  isAuthenticated: boolean;
  isHydrated: boolean;

  setAuth: (user: User, token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
  setHydrated: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      role: null,
      isAuthenticated: false,
      isHydrated: false,

      setAuth: (user, token) =>
        set({ user, token, role: user.role, isAuthenticated: true }),

      setUser: (user) =>
        set({ user, role: user.role }),

      logout: () =>
        set({ user: null, token: null, role: null, isAuthenticated: false }),

      setHydrated: () =>
        set({ isHydrated: true }),
    }),
    {
      name: 'partner-portal-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        role: state.role,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
