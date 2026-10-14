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
import { CartItem, Product, ProductColor } from '@/types';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, size: string, color: ProductColor, quantity?: number) => void;
  removeItem: (productId: string, size: string, colorName: string) => void;
  updateQuantity: (productId: string, size: string, colorName: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartStore | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('ramraj-cart');
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ramraj-cart', JSON.stringify(items));
  }, [items]);

  const addItem = useCallback(
    (product: Product, size: string, color: ProductColor, quantity = 1) => {
      setItems((currentItems) => {
        const existingIndex = currentItems.findIndex(
          (item) =>
            item.product.id === product.id &&
            item.selectedSize === size &&
            item.selectedColor.name === color.name
        );

        if (existingIndex >= 0) {
          const nextItems = [...currentItems];
          nextItems[existingIndex] = {
            ...nextItems[existingIndex],
            quantity: nextItems[existingIndex].quantity + quantity,
          };
          return nextItems;
        }

        return [...currentItems, { product, quantity, selectedSize: size, selectedColor: color }];
      });
    },
    []
  );

  const removeItem = useCallback((productId: string, size: string, colorName: string) => {
    setItems((currentItems) =>
      currentItems.filter(
        (item) =>
          !(item.product.id === productId && item.selectedSize === size && item.selectedColor.name === colorName)
      )
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, size: string, colorName: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId, size, colorName);
        return;
      }

      setItems((currentItems) =>
        currentItems.map((item) =>
          item.product.id === productId &&
          item.selectedSize === size &&
          item.selectedColor.name === colorName
            ? { ...item, quantity }
            : item
        )
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((currentState) => !currentState), []);

  const getTotalItems = useCallback(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const getTotalPrice = useCallback(
    () => items.reduce((total, item) => total + item.product.price * item.quantity, 0),
    [items]
  );

  const value = useMemo<CartStore>(
    () => ({
      items,
      isOpen,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
      getTotalItems,
      getTotalPrice,
    }),
    [items, isOpen, addItem, removeItem, updateQuantity, clearCart, openCart, closeCart, toggleCart, getTotalItems, getTotalPrice]
  );

  return createElement(CartContext.Provider, { value }, children);
}

export function useCartStore(): CartStore {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCartStore must be used within CartProvider');
  }

  return context;
}
