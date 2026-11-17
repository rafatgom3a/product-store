import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LockKeyhole, Mail, UserRound, ShoppingBag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function SignUp() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const change = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  async function handleSubmit(event) {
    event.preventDefault(); setError('');
    if (form.password.length < 8) return setError('Password must be at least 8 characters long.');
    if (form.password !== form.confirmPassword) return setError('Passwords do not match.');
    setBusy(true);
    try {
      const { confirmPassword, ...details } = form;
      await register(details);
      navigate('/account', { replace: true });
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }

  const inputClass = 'w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-3 text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:ring-indigo-900';
  return <main className="mx-auto flex min-h-[75vh] max-w-6xl items-center justify-center px-4 py-12">
    <section className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-700 dark:bg-gray-800">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white"><ShoppingBag size={27} /></div>
      <h1 className="text-center text-3xl font-bold text-gray-900 dark:text-white">Create your account</h1>
      <p className="mb-8 mt-2 text-center text-sm text-gray-500 dark:text-gray-400">Join StoreHub and start shopping.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Full name<span className="relative mt-2 block"><UserRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} /><input name="name" autoComplete="name" required maxLength={80} value={form.name} onChange={change} placeholder="Your name" className={inputClass} /></span></label>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email address<span className="relative mt-2 block"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} /><input name="email" type="email" autoComplete="email" required value={form.email} onChange={change} placeholder="you@example.com" className={inputClass} /></span></label>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Password<span className="relative mt-2 block"><LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} /><input name="password" type="password" autoComplete="new-password" minLength={8} required value={form.password} onChange={change} placeholder="At least 8 characters" className={inputClass} /></span></label>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Confirm password<span className="relative mt-2 block"><LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} /><input name="confirmPassword" type="password" autoComplete="new-password" required value={form.confirmPassword} onChange={change} placeholder="Re-enter your password" className={inputClass} /></span></label>
        {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">{error}</p>}
        <button disabled={busy} className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60">{busy ? 'Creating account…' : 'Create Account'}</button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">Already have an account? <Link to="/signin" className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400">Sign in</Link></p>
    </section>
  </main>;
}
