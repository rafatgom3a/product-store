import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LockKeyhole, Mail, ShoppingBag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const change = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  async function handleSubmit(event) {
    event.preventDefault(); setError(''); setBusy(true);
    try {
      await login(form);
      navigate(location.state?.from?.pathname || '/', { replace: true });
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }

  return <main className="mx-auto flex min-h-[75vh] max-w-6xl items-center justify-center px-4 py-12">
    <section className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-700 dark:bg-gray-800">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white"><ShoppingBag size={27} /></div>
      <h1 className="text-center text-3xl font-bold text-gray-900 dark:text-white">Welcome back</h1>
      <p className="mb-8 mt-2 text-center text-sm text-gray-500 dark:text-gray-400">Sign in to continue to your StoreHub account.</p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email address
          <span className="relative mt-2 block"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} /><input name="email" type="email" autoComplete="email" required value={form.email} onChange={change} placeholder="you@example.com" className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-3 text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:ring-indigo-900" /></span>
        </label>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Password
          <span className="relative mt-2 block"><LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} /><input name="password" type="password" autoComplete="current-password" required value={form.password} onChange={change} placeholder="Enter your password" className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-3 text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:ring-indigo-900" /></span>
        </label>
        {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">{error}</p>}
        <button disabled={busy} className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60">{busy ? 'Signing in…' : 'Sign In'}</button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">Don't have an account? <Link to="/signup" className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400">Create one</Link></p>
    </section>
  </main>;
}
