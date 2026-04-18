import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Guide {
  id: string;
  name: string;
  city: string;
  dailyRate: number;
  certificationId: string;
}

export interface CartItem {
  guide: Guide;
  duration: number; // days
  numberOfPeople: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (guideId: string) => void;
  updateItem: (guideId: string, updates: Partial<CartItem>) => void;
  clearCart: () => void;
  getTotalAmount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => {
        const existing = state.items.find(i => i.guide.id === item.guide.id);
        if (existing) {
          return {
            items: state.items.map(i => i.guide.id === item.guide.id ? item : i)
          };
        }
        return { items: [...state.items, item] };
      }),
      removeItem: (guideId) => set((state) => ({
        items: state.items.filter(item => item.guide.id !== guideId)
      })),
      updateItem: (guideId, updates) => set((state) => ({
        items: state.items.map(item => 
          item.guide.id === guideId ? { ...item, ...updates } : item
        )
      })),
      clearCart: () => set({ items: [] }),
      getTotalAmount: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          return total + (item.guide.dailyRate * item.numberOfPeople * item.duration);
        }, 0);
      }
    }),
    {
      name: 'guidelink-cart',
    }
  )
);
