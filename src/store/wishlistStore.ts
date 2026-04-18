import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistStore {
  wishlist: string[]; // array of guide IDs
  toggleWishlist: (guideId: string) => void;
  isInWishlist: (guideId: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlist: [],
      toggleWishlist: (guideId) => set((state) => {
        const exists = state.wishlist.includes(guideId);
        if (exists) {
          return { wishlist: state.wishlist.filter(id => id !== guideId) };
        }
        return { wishlist: [...state.wishlist, guideId] };
      }),
      isInWishlist: (guideId) => {
        return get().wishlist.includes(guideId);
      }
    }),
    {
      name: 'guidelink-wishlist',
    }
  )
);
