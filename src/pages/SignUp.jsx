import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LockKeyhole, Mail, UserRound, ShoppingBag, Phone } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const inputClass = 'w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-3 text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:ring-indigo-900';
const sudanPhonePattern = /^(?:\+249|00249|0)?[19][0-9]{8}$/;

export default function SignUp() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const change = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  async function handleSubmit(event) {
    event.preventDefault(); setError('');
    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const phone = form.phone.replace(/[\s()-]/g, '');
    if (name.length < 2 || name.length > 80) return setError('Name must be between 2 and 80 characters.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return setError('Please enter a valid email address.');
    if (!sudanPhonePattern.test(phone)) return setError('Enter a valid Sudanese mobile number, e.g. +249912345678.');
    if (form.password.length < 8 || form.password.length > 128 || !/[A-Za-z]/.test(form.password) || !/[0-9]/.test(form.password)) return setError('Password must be 8–128 characters and include letters and numbers.');
    if (form.password !== form.confirmPassword) return setError('Passwords do not match.');
    setBusy(true);
    try {
      await register({ name, email, phone: phone.startsWith('+') ? phone : phone.startsWith('00249') ? `+${phone.slice(2)}` : phone.startsWith('0') ? `+249${phone.slice(1)}` : `+249${phone}` , password: form.password });
      navigate('/', { replace: true });
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }

  return <main className="mx-auto flex min-h-[75vh] max-w-6xl items-center justify-center px-4 py-12">
    <section className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-700 dark:bg-gray-800">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white"><ShoppingBag size={27} /></div>
      <h1 className="text-center text-3xl font-bold text-gray-900 dark:text-white">Create your account</h1>
      <p className="mb-8 mt-2 text-center text-sm text-gray-500 dark:text-gray-400">Join StoreHub and start shopping.</p>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Full name<span className="relative mt-2 block"><UserRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} /><input name="name" autoComplete="name" required minLength={2} maxLength={80} value={form.name} onChange={change} placeholder="Your full name" className={inputClass} /></span></label>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email address<span className="relative mt-2 block"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} /><input name="email" type="email" autoComplete="email" required maxLength={254} value={form.email} onChange={change} placeholder="you@example.com" className={inputClass} /></span></label>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Sudanese mobile number<span className="relative mt-2 block"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} /><input name="phone" type="tel" inputMode="tel" autoComplete="tel" required maxLength={18} value={form.phone} onChange={change} placeholder="+249 912 345 678" className={inputClass} /></span><span className="mt-1 block text-xs text-gray-500">Use +249 or a local number beginning with 0.</span></label>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Password<span className="relative mt-2 block"><LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} /><input name="password" type="password" autoComplete="new-password" minLength={8} maxLength={128} required value={form.password} onChange={change} placeholder="At least 8 characters, letters and numbers" className={inputClass} /></span></label>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Confirm password<span className="relative mt-2 block"><LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} /><input name="confirmPassword" type="password" autoComplete="new-password" required value={form.confirmPassword} onChange={change} placeholder="Re-enter your password" className={inputClass} /></span></label>
        {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">{error}</p>}
        <button disabled={busy} className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60">{busy ? 'Creating account…' : 'Create Account'}</button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">Already have an account? <Link to="/signin" className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400">Sign in</Link></p>
    </section>
  </main>;
}
