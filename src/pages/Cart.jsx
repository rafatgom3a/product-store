import { Minus, Plus, Trash2, ShoppingBag, CreditCard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

export default function Cart() {
  const {
    cartItems, removeFromCart, increaseQuantity, decreaseQuantity,
    getTotalItems, getTotalPrice,
  } = useCart();
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (isLoading) return;
    // Preserve the intended destination so SignIn can return here after login.
    navigate(user ? '/checkout' : '/signin', {
      state: user ? undefined : { from: { pathname: '/checkout' } },
    });
  };

  return (
    <main className="min-h-[65vh] bg-gray-100 px-4 py-10 dark:bg-gray-800">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-7 flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
          <ShoppingBag /> Your Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <section className="flex flex-col items-center rounded-2xl bg-white px-6 py-14 text-center shadow-sm dark:bg-gray-900">
            <ShoppingBag size={58} className="mb-4 text-gray-300" />
            <h2 className="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-200">Your cart is empty</h2>
            <p className="mb-6 text-gray-500 dark:text-gray-400">Browse our products and add something you like.</p>
            <Link to="/products" className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700">
              Browse Products
            </Link>
          </section>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <section className="space-y-4">
              {cartItems.map((item) => (
                <article key={item.id} className="flex flex-wrap items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                  <img
                    src={item.thumbnail || item.image || item.imageUrl || '/placeholder.png'}
                    alt={item.title || item.name || 'Product'}
                    className="h-20 w-20 rounded-xl bg-gray-50 object-contain dark:bg-gray-800"
                  />
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate font-semibold text-gray-900 dark:text-white">{item.title || item.name}</h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">${(Number(item.price) || 0).toFixed(2)} each</p>
                    <div className="mt-3 flex items-center gap-3">
                      <button aria-label="Decrease quantity" onClick={() => decreaseQuantity(item.id)} className="rounded-lg border p-1.5 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800"><Minus size={15} /></button>
                      <span className="w-5 text-center font-semibold dark:text-white">{item.quantity}</span>
                      <button aria-label="Increase quantity" onClick={() => increaseQuantity(item.id)} className="rounded-lg border p-1.5 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800"><Plus size={15} /></button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-gray-900 dark:text-white">${((Number(item.price) || 0) * item.quantity).toFixed(2)}</span>
                    <button aria-label="Remove item" onClick={() => removeFromCart(item.id)} className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"><Trash2 size={19} /></button>
                  </div>
                </article>
              ))}
            </section>

            <aside className="h-fit rounded-2xl bg-white p-5 shadow-sm dark:bg-gray-900">
              <h2 className="mb-5 text-lg font-bold text-gray-900 dark:text-white">Order summary</h2>
              <div className="flex justify-between py-2 text-sm text-gray-600 dark:text-gray-300">
                <span>Items ({getTotalItems()})</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="my-3 border-t border-gray-200 dark:border-gray-700" />
              <div className="mb-5 flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                <span>Total</span><span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
              >
                <CreditCard size={19} /> {isLoading ? 'Checking session…' : 'Proceed to Checkout'}
              </button>
              {!user && !isLoading && (
                <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
                  You will be asked to sign in before continuing to payment.
                </p>
              )}
              <Link to="/products" className="mt-4 block text-center text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400">
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
