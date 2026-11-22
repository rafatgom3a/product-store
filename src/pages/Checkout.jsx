import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, LockKeyhole, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

export default function Checkout() {
  const { cartItems, getTotalItems, getTotalPrice } = useCart();
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [notice, setNotice] = useState('');
  const [phone, setPhone] = useState(user?.phone || user?.mobile || '');
  const [formError, setFormError] = useState('');

  const customerName = user?.name || '';
  const customerEmail = user?.email || '';

  const handleSubmit = (event) => {
    event.preventDefault(); setFormError('');
    const data = new FormData(event.currentTarget);
    const name = String(data.get('customerName') || '').trim();
    const email = String(data.get('customerEmail') || '').trim();
    const address = String(data.get('address') || '').trim();
    const normalizedPhone = phone.replace(/[\s()-]/g, '');
    if (name.length < 2 || name.length > 80) return setFormError('Enter a name between 2 and 80 characters.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return setFormError('Enter a valid email address.');
    if (!/^(?:\+249|00249|0)?[19][0-9]{8}$/.test(normalizedPhone)) return setFormError('Enter a valid Sudanese mobile number, e.g. +249912345678.');
    if (address.length < 8 || address.length > 300) return setFormError('Address must be between 8 and 300 characters.');
    setNotice('Checkout information validated. A payment/order API must be connected to submit a real order.');
  };

  if (!cartItems.length) return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
      <ShoppingBag size={54} className="mb-4 text-gray-300" />
      <h1 className="text-2xl font-bold dark:text-white">Your cart is empty</h1>
      <Link to="/products" className="mt-5 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white">Browse Products</Link>
    </main>
  );

  return (
    <main className="min-h-[70vh] bg-gray-50 px-4 py-10 dark:bg-gray-800">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Checkout</h1>
        <p className="mb-8 text-gray-500 dark:text-gray-300">Review your order and enter your contact and delivery details.</p>
        <div className="grid gap-7 lg:grid-cols-[1fr_360px]">
          <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-900">
            <section>
              <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Customer information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Full name
                  <input name="customerName" required minLength={2} maxLength={80} defaultValue={customerName} autoComplete="name" className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white" />
                </label>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Email address
                  <input name="customerEmail" required type="email" maxLength={254} defaultValue={customerEmail} autoComplete="email" className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white" />
                </label>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200 sm:col-span-2">Customer mobile number
                  <input required type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+249 912 345 678" maxLength={18} className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white" />
                </label>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200 sm:col-span-2">Shipping address
                  <input name="address" required minLength={8} maxLength={300} autoComplete="street-address" placeholder="Enter your full address" className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white" />
                </label>
              </div>
            </section>
            <section>
              <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Payment method</h2>
              <label className={`mb-3 flex cursor-pointer items-center gap-3 rounded-xl border p-4 ${paymentMethod === 'card' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30' : 'border-gray-200 dark:border-gray-700'}`}>
                <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={(e) => setPaymentMethod(e.target.value)} />
                <CreditCard size={20} className="text-indigo-600" /><span className="font-medium text-gray-800 dark:text-gray-100">Credit / Debit Card</span>
              </label>
              <label className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 ${paymentMethod === 'cash' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30' : 'border-gray-200 dark:border-gray-700'}`}>
                <input type="radio" name="payment" value="cash" checked={paymentMethod === 'cash'} onChange={(e) => setPaymentMethod(e.target.value)} />
                <ShoppingBag size={20} className="text-indigo-600" /><span className="font-medium text-gray-800 dark:text-gray-100">Cash on Delivery</span>
              </label>
            </section>
            {formError && <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-200">{formError}</p>}
            {notice && <p role="status" className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800 dark:bg-amber-950/30 dark:text-amber-200">{notice}</p>}
            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"><LockKeyhole size={18} /> Continue</button>
          </form>
          <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-900">
            <h2 className="mb-5 text-lg font-bold text-gray-900 dark:text-white">Order summary</h2>
            <div className="space-y-4">{cartItems.map((item) => <div key={item.id} className="flex items-center justify-between gap-3 text-sm"><span className="min-w-0 flex-1 truncate text-gray-600 dark:text-gray-300">{item.title} × {item.quantity}</span><span className="font-semibold text-gray-900 dark:text-white">${(Number(item.price || 0) * item.quantity).toFixed(2)}</span></div>)}</div>
            <div className="my-5 border-t border-gray-200 dark:border-gray-700" />
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300"><span>Total items</span><span>{getTotalItems()}</span></div>
            <div className="mt-3 flex justify-between text-lg font-bold text-gray-900 dark:text-white"><span>Total</span><span>${getTotalPrice().toFixed(2)}</span></div>
            <Link to="/cart" className="mt-5 block text-center text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400">Back to cart</Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
