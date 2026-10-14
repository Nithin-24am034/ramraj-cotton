'use client';

import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { Product } from '@/types';
import toast from 'react-hot-toast';

interface WishlistStore {
  items: Product[];
  isOpen: boolean;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
  clearWishlist: () => void;
  openWishlist: () => void;
  closeWishlist: () => void;
  totalWishlistItems: number;
}

const WishlistContext = createContext<WishlistStore | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('ramraj-wishlist');
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('ramraj-wishlist', JSON.stringify(items));
    } catch {
      // storage unavailable
    }
  }, [items]);

  const addToWishlist = useCallback((product: Product) => {
    setItems((curr) => {
      if (curr.some((p) => p.id === product.id)) return curr;
      toast.success(`Saved to Wishlist: ${product.name.slice(0, 24)}...`);
      return [...curr, product];
    });
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setItems((curr) => curr.filter((p) => p.id !== productId));
    toast('Removed from Wishlist', { icon: '🤍' });
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => items.some((p) => p.id === productId),
    [items]
  );

  const toggleWishlist = useCallback(
    (product: Product) => {
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
    },
    [isInWishlist, removeFromWishlist, addToWishlist]
  );

  const clearWishlist = useCallback(() => setItems([]), []);
  const openWishlist = useCallback(() => setIsOpen(true), []);
  const closeWishlist = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({
      items,
      isOpen,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      toggleWishlist,
      clearWishlist,
      openWishlist,
      closeWishlist,
      totalWishlistItems: items.length,
    }),
    [items, isOpen, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist, clearWishlist, openWishlist, closeWishlist]
  );

  return createElement(WishlistContext.Provider, { value }, children);
}

export function useWishlistStore(): WishlistStore {
  const context = useContext(WishlistContext);
  if (!context) {
    return {
      items: [],
      isOpen: false,
      addToWishlist: () => {},
      removeFromWishlist: () => {},
      isInWishlist: () => false,
      toggleWishlist: () => {},
      clearWishlist: () => {},
      openWishlist: () => {},
      closeWishlist: () => {},
      totalWishlistItems: 0,
    };
  }
  return context;
}
