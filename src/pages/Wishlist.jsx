import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

export default function Wishlist() {
  const { wishlistItems, isWishlistLoading, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <main className="min-h-[65vh] bg-gray-100 px-4 py-10 dark:bg-gray-800">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-7 flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
          <Heart className="text-rose-500" /> My Wishlist
          <span className="text-base font-medium text-gray-500 dark:text-gray-400">({wishlistItems.length})</span>
        </h1>
        {isWishlistLoading ? (
          <p className="py-12 text-center text-gray-500">Loading your saved favorites…</p>
        ) : wishlistItems.length === 0 ? (
          <section className="flex flex-col items-center rounded-2xl bg-white px-6 py-14 text-center shadow-sm dark:bg-gray-900">
            <Heart size={58} className="mb-4 text-rose-300" />
            <h2 className="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-200">Your wishlist is empty</h2>
            <p className="mb-6 text-gray-500 dark:text-gray-400">Save products you like and find them here later.</p>
            <Link to="/products" className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700">Explore Products</Link>
          </section>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {wishlistItems.map((product) => (
              <article key={product.id} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
                <Link to={`/products/${product.id}`} className="block">
                  <img src={product.thumbnail || product.images?.[0]} alt={product.title} className="h-52 w-full bg-gray-50 object-contain dark:bg-gray-800" />
                </Link>
                <div className="p-5">
                  <Link to={`/products/${product.id}`} className="line-clamp-2 font-semibold text-gray-900 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400">{product.title}</Link>
                  <p className="mt-2 text-lg font-bold text-emerald-600 dark:text-emerald-400">${Number(product.price || 0).toFixed(2)}</p>
                  <div className="mt-4 flex gap-2">
                    <button onClick={() => addToCart(product)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-3 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
                      <ShoppingCart size={17} /> Add to Cart
                    </button>
                    <button onClick={() => removeFromWishlist(product.id)} aria-label="Remove from wishlist" title="Remove from wishlist" className="rounded-xl border border-gray-300 px-3 text-rose-500 hover:bg-rose-50 dark:border-gray-700 dark:hover:bg-rose-950/30">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
