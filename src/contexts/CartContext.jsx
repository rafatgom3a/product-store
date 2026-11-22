import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

function normalizeItems(items = []) {
  return items.filter(Boolean).map((item) => ({
    ...item,
    id: item.id || item._id || item.product?._id,
    quantity: Math.max(1, Number(item.quantity) || 1),
  }));
}

export function CartProvider({ children }) {
  const { user, isLoading: authLoading } = useAuth();
  const userId = user?._id || user?.id || null;
  const [cartItems, setCartItems] = useState([]);
  const [isCartLoading, setIsCartLoading] = useState(false);

  // Guest cart is intentionally memory-only. Authenticated carts are always
  // loaded from MongoDB and guest edits are never merged into/overwritten on it.
  useEffect(() => {
    let active = true;
    if (authLoading) return () => { active = false; };

    if (!userId) {
      setCartItems([]);
      setIsCartLoading(false);
      return () => { active = false; };
    }

    setIsCartLoading(true);
    api.get('/cart')
      .then(({ data }) => {
        if (active) setCartItems(normalizeItems(data.items));
      })
      .catch((error) => {
        console.error('Could not load your saved cart:', error);
        if (active) setCartItems([]);
      })
      .finally(() => { if (active) setIsCartLoading(false); });

    return () => { active = false; };
  }, [userId, authLoading]);

  const addToCart = useCallback(async (product) => {
    if (!product || !(product.id || product._id)) return;
    if (userId) {
      const { data } = await api.post(`/cart/items/${product.id || product._id}`, { quantity: 1 });
      setCartItems(normalizeItems(data.items));
      return;
    }
    setCartItems((previous) => {
      const id = String(product.id || product._id);
      const existing = previous.find((item) => String(item.id) === id);
      return existing
        ? previous.map((item) => String(item.id) === id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...previous, { ...product, id, quantity: 1 }];
    });
  }, [userId]);

  const removeFromCart = useCallback(async (id) => {
    if (userId) {
      const { data } = await api.delete(`/cart/items/${id}`);
      setCartItems(normalizeItems(data.items));
    } else {
      setCartItems((previous) => previous.filter((item) => String(item.id) !== String(id)));
    }
  }, [userId]);

  const setQuantity = useCallback(async (id, quantity) => {
    const nextQuantity = Math.max(1, Number(quantity) || 1);
    if (userId) {
      const { data } = await api.patch(`/cart/items/${id}`, { quantity: nextQuantity });
      setCartItems(normalizeItems(data.items));
    } else {
      setCartItems((previous) => previous.map((item) =>
        String(item.id) === String(id) ? { ...item, quantity: nextQuantity } : item
      ));
    }
  }, [userId]);

  const increaseQuantity = useCallback((id) => {
    const item = cartItems.find((entry) => String(entry.id) === String(id));
    if (item) return setQuantity(id, item.quantity + 1);
  }, [cartItems, setQuantity]);

  const decreaseQuantity = useCallback((id) => {
    const item = cartItems.find((entry) => String(entry.id) === String(id));
    if (item && item.quantity > 1) return setQuantity(id, item.quantity - 1);
  }, [cartItems, setQuantity]);

  const getTotalItems = useCallback(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );
  const getTotalPrice = useCallback(
    () => cartItems.reduce((total, item) => total + (Number(item.price) || 0) * item.quantity, 0),
    [cartItems]
  );

  const value = useMemo(() => ({
    cartItems, isCartLoading, addToCart, removeFromCart,
    increaseQuantity, decreaseQuantity, getTotalItems, getTotalPrice,
  }), [cartItems, isCartLoading, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, getTotalItems, getTotalPrice]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
};
