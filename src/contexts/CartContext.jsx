import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);
const CART_STORAGE_KEY = 'cart';

function readCart() {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed)
      ? parsed.filter((item) => item && item.id != null).map((item) => ({
          ...item,
          quantity: Math.max(1, Number(item.quantity) || 1),
        }))
      : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  // The cart belongs to this browser, not to an authenticated session.
  // Therefore signing in or out never replaces or clears its contents.
  const [cartItems, setCartItems] = useState(readCart);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Could not persist shopping cart:', error);
    }
  }, [cartItems]);

  // Keep the cart in sync if the same store is open in another browser tab.
  useEffect(() => {
    const syncCart = (event) => {
      if (event.key === CART_STORAGE_KEY) setCartItems(readCart());
    };
    window.addEventListener('storage', syncCart);
    return () => window.removeEventListener('storage', syncCart);
  }, []);

  const addToCart = useCallback((product) => {
    if (!product || product.id == null) return;
    setCartItems((previous) => {
      const existing = previous.find((item) => String(item.id) === String(product.id));
      if (existing) {
        return previous.map((item) =>
          String(item.id) === String(product.id)
            ? { ...item, quantity: (Number(item.quantity) || 1) + 1 }
            : item
        );
      }
      return [...previous, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCartItems((previous) => previous.filter((item) => String(item.id) !== String(id)));
  }, []);

  const increaseQuantity = useCallback((id) => {
    setCartItems((previous) => previous.map((item) =>
      String(item.id) === String(id)
        ? { ...item, quantity: (Number(item.quantity) || 1) + 1 }
        : item
    ));
  }, []);

  const decreaseQuantity = useCallback((id) => {
    setCartItems((previous) => previous.map((item) =>
      String(item.id) === String(id) && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);
  const getTotalItems = useCallback(
    () => cartItems.reduce((total, item) => total + (Number(item.quantity) || 0), 0),
    [cartItems]
  );
  const getTotalPrice = useCallback(
    () => cartItems.reduce((total, item) => total + (Number(item.price) || 0) * (Number(item.quantity) || 0), 0),
    [cartItems]
  );

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart, increaseQuantity,
      decreaseQuantity, clearCart, getTotalItems, getTotalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
};
