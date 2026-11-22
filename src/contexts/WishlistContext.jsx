import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const WishlistContext = createContext(null);

function normalizeProducts(products = []) {
  return products.filter(Boolean).map((product) => ({
    ...product,
    id: String(product.id || product._id || product.product?._id),
  })).filter((product) => product.id && product.id !== 'undefined');
}

export function WishlistProvider({ children }) {
  const { user, isLoading: authLoading } = useAuth();
  const userId = user?._id || user?.id || null;
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);

  // Signed-in favorites are stored per user in MongoDB. Guest favorites stay
  // separate and in memory; they are never merged into another account.
  useEffect(() => {
    let active = true;
    if (authLoading) return () => { active = false; };
    if (!userId) {
      setWishlistItems([]);
      setIsWishlistLoading(false);
      return () => { active = false; };
    }
    setIsWishlistLoading(true);
    api.get('/wishlist')
      .then(({ data }) => { if (active) setWishlistItems(normalizeProducts(data.products)); })
      .catch((error) => {
        console.error('Could not load your saved wishlist:', error);
        if (active) setWishlistItems([]);
      })
      .finally(() => { if (active) setIsWishlistLoading(false); });
    return () => { active = false; };
  }, [userId, authLoading]);

  const isInWishlist = useCallback((productOrId) => {
    const id = String(typeof productOrId === 'object' ? (productOrId?.id || productOrId?._id) : productOrId);
    return wishlistItems.some((item) => String(item.id) === id);
  }, [wishlistItems]);

  const addToWishlist = useCallback(async (product) => {
    const id = product?.id || product?._id;
    if (!id) return;
    if (userId) {
      const { data } = await api.post(`/wishlist/products/${id}`);
      setWishlistItems(normalizeProducts(data.products));
    } else {
      setWishlistItems((previous) => previous.some((item) => String(item.id) === String(id))
        ? previous : [...previous, { ...product, id: String(id) }]);
    }
  }, [userId]);

  const removeFromWishlist = useCallback(async (productOrId) => {
    const id = typeof productOrId === 'object' ? (productOrId?.id || productOrId?._id) : productOrId;
    if (!id) return;
    if (userId) {
      const { data } = await api.delete(`/wishlist/products/${id}`);
      setWishlistItems(normalizeProducts(data.products));
    } else {
      setWishlistItems((previous) => previous.filter((item) => String(item.id) !== String(id)));
    }
  }, [userId]);

  const toggleWishlist = useCallback(async (product) => {
    if (isInWishlist(product)) return removeFromWishlist(product);
    return addToWishlist(product);
  }, [isInWishlist, removeFromWishlist, addToWishlist]);

  const value = useMemo(() => ({
    wishlistItems, isWishlistLoading, isInWishlist, addToWishlist, removeFromWishlist, toggleWishlist,
  }), [wishlistItems, isWishlistLoading, isInWishlist, addToWishlist, removeFromWishlist, toggleWishlist]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used inside WishlistProvider');
  return context;
}
