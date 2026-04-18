import { create } from 'zustand';

export type UserRole = 'TRAVELER' | 'GUIDE' | 'ADMIN';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isAdmin: boolean;
}

interface AuthStore {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
