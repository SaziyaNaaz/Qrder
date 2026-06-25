"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { GST_RATE } from "@/lib/constants";
import type { CartLine, Dish } from "@/lib/types/menu";

type CartContextValue = {
  items: CartLine[];
  specialInstructions: string;
  itemCount: number;
  subtotal: number;
  tax: number;
  total: number;
  addItem: (dish: Dish) => void;
  removeItem: (dishId: string) => void;
  updateQuantity: (dishId: string, quantity: number) => void;
  setSpecialInstructions: (value: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState("");

  const addItem = useCallback((dish: Dish) => {
    setItems((current) => {
      const existing = current.find((line) => line.dish.id === dish.id);
      if (existing) {
        return current.map((line) =>
          line.dish.id === dish.id
            ? { ...line, quantity: line.quantity + 1 }
            : line,
        );
      }
      return [...current, { dish, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((dishId: string) => {
    setItems((current) => current.filter((line) => line.dish.id !== dishId));
  }, []);

  const updateQuantity = useCallback((dishId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((current) => current.filter((line) => line.dish.id !== dishId));
      return;
    }

    setItems((current) =>
      current.map((line) =>
        line.dish.id === dishId ? { ...line, quantity } : line,
      ),
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setSpecialInstructions("");
  }, []);

  const itemCount = useMemo(
    () => items.reduce((sum, line) => sum + line.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((sum, line) => sum + line.dish.price * line.quantity, 0),
    [items],
  );

  const tax = useMemo(() => Math.round(subtotal * GST_RATE), [subtotal]);
  const total = subtotal + tax;

  const value = useMemo(
    () => ({
      items,
      specialInstructions,
      itemCount,
      subtotal,
      tax,
      total,
      addItem,
      removeItem,
      updateQuantity,
      setSpecialInstructions,
      clearCart,
    }),
    [
      items,
      specialInstructions,
      itemCount,
      subtotal,
      tax,
      total,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
