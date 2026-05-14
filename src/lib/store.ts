import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types';

interface CartItem extends Product {
  quantity: number;
}

interface AppState {
  cart: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  isAdminConsoleOpen: boolean;
  setAdminConsoleOpen: (open: boolean) => void;
  isVirtualHubOpen: boolean;
  setVirtualHubOpen: (open: boolean) => void;
  notification: { message: string, type: 'success' | 'info' | 'error' } | null;
  setNotification: (notif: { message: string, type: 'success' | 'info' | 'error' } | null) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      cart: [],
      addItem: (product) => set((state) => {
        const existing = state.cart.find((item) => item.id === product.id);
        if (existing) {
          return {
            cart: state.cart.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          };
        }
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
      }),
      removeItem: (productId) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== productId),
      })),
      updateQuantity: (productId, quantity) => set((state) => ({
        cart: state.cart.map((item) =>
          item.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item
        ),
      })),
      clearCart: () => set({ cart: [] }),
      isCartOpen: false,
      setCartOpen: (open) => set({ isCartOpen: open }),
      isAuthModalOpen: false,
      setAuthModalOpen: (open) => set({ isAuthModalOpen: open }),
      isAdminConsoleOpen: false,
      setAdminConsoleOpen: (open) => set({ isAdminConsoleOpen: open }),
      isVirtualHubOpen: false,
      setVirtualHubOpen: (open) => set({ isVirtualHubOpen: open }),
      notification: null,
      setNotification: (notification) => set({ notification }),
    }),
    { name: 'keells-storage' }
  )
);
