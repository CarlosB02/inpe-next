'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Cart, CartLine } from '../types/shopify';
import { getCart, createCart, addToCart, updateCartLines, removeFromCart } from '../lib/shopify';

interface CartContextType {
  cart: Cart | null;
  isOpen: boolean;
  loading: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (merchandiseId: string, quantity: number) => Promise<void>;
  addItems: (items: { merchandiseId: string; quantity: number }[]) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'inpe_shopify_cart_id';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize and load cart on mount
  useEffect(() => {
    async function initCart() {
      try {
        const storedCartId = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedCartId) {
          const fetchedCart = await getCart(storedCartId);
          if (fetchedCart) {
            setCart(fetchedCart);
          } else {
            // If the cart has expired or doesn't exist on Shopify, clear localStorage
            localStorage.removeItem(LOCAL_STORAGE_KEY);
          }
        }
      } catch (err) {
        console.error('Failed to initialize Shopify cart:', err);
      } finally {
        setLoading(false);
      }
    }

    initCart();
  }, []);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  // Helper to update state and load spinner
  const runCartOperation = async (operation: () => Promise<Cart>) => {
    setLoading(true);
    try {
      const updatedCart = await operation();
      setCart(updatedCart);
    } catch (err) {
      console.error('Shopify Cart Operation Failed:', err);
      alert(err instanceof Error ? err.message : 'Erro ao atualizar o carrinho.');
    } finally {
      setLoading(false);
    }
  };

  // 1. Add line item
  const addItem = async (merchandiseId: string, quantity: number) => {
    if (!cart) {
      // Lazy cart creation
      setLoading(true);
      try {
        const newCart = await createCart([{ merchandiseId, quantity }]);
        setCart(newCart);
        localStorage.setItem(LOCAL_STORAGE_KEY, newCart.id);
        setIsOpen(true); // Open drawer on addition
      } catch (err) {
        console.error('Failed to create Shopify cart:', err);
      } finally {
        setLoading(false);
      }
    } else {
      // Cart already exists
      await runCartOperation(() => addToCart(cart.id, [{ merchandiseId, quantity }]));
      setIsOpen(true); // Open drawer
    }
  };

  // 1b. Add multiple line items
  const addItems = async (items: { merchandiseId: string; quantity: number }[]) => {
    if (items.length === 0) return;
    if (!cart) {
      setLoading(true);
      try {
        const newCart = await createCart(items);
        setCart(newCart);
        localStorage.setItem(LOCAL_STORAGE_KEY, newCart.id);
        setIsOpen(true);
      } catch (err) {
        console.error('Failed to create Shopify cart:', err);
      } finally {
        setLoading(false);
      }
    } else {
      await runCartOperation(() => addToCart(cart.id, items));
      setIsOpen(true);
    }
  };

  // 2. Update line item quantity
  const updateItem = async (lineId: string, quantity: number) => {
    if (!cart) return;

    if (quantity <= 0) {
      await removeItem(lineId);
    } else {
      await runCartOperation(() => updateCartLines(cart.id, [{ id: lineId, quantity }]));
    }
  };

  // 3. Remove line item
  const removeItem = async (lineId: string) => {
    if (!cart) return;
    await runCartOperation(() => removeFromCart(cart.id, [lineId]));
  };

  // Derive total quantity
  const cartCount = cart?.totalQuantity || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        loading,
        openCart,
        closeCart,
        addItem,
        addItems,
        updateItem,
        removeItem,
        cartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
