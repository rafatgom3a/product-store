import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, ShieldCheck, UserRound, Mail, Phone, Save } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const phonePattern = /^(?:\+249|00249|0)?[19][0-9]{8}$/;
export default function Account() {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: user?.name || '', phone: user?.phone || '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [busy, setBusy] = useState(false);
  function handleLogout() { logout(); navigate('/', { replace: true }); }
  async function handleSubmit(event) {
    event.preventDefault(); setError(''); setSuccess('');
    const name = form.name.trim();
    const phone = form.phone.replace(/[\s()-]/g, '');
    if (name.length < 2 || name.length > 80) return setError('Name must be between 2 and 80 characters.');
    if (!phonePattern.test(phone)) return setError('Enter a valid Sudanese mobile number, e.g. +249912345678.');
    const normalizedPhone = phone.startsWith('+') ? phone : phone.startsWith('00249') ? `+${phone.slice(2)}` : phone.startsWith('0') ? `+249${phone.slice(1)}` : `+249${phone}`;
    setBusy(true);
    try { await updateProfile({ name, phone: normalizedPhone }); setSuccess('Your account details have been updated.'); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  return <main className="mx-auto min-h-[65vh] max-w-5xl px-4 py-12">
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Your account</p><h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">Hello, {user?.name}</h1><p className="mt-1 text-gray-500 dark:text-gray-400">Manage your personal information and account security.</p></div><button onClick={handleLogout} className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2.5 font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"><LogOut size={18}/> Sign out</button></div>
      <form onSubmit={handleSubmit} noValidate className="mt-8 max-w-2xl space-y-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Full name<span className="relative mt-2 block"><UserRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required minLength={2} maxLength={80} autoComplete="name" className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-3 text-gray-900 outline-none focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"/></span></label>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email address<span className="relative mt-2 block"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/><input value={user?.email || ''} readOnly className="w-full rounded-xl border border-gray-200 bg-gray-100 py-3 pl-10 pr-3 text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400"/></span><span className="mt-1 block text-xs text-gray-500">Email address cannot be changed here.</span></label>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Sudanese mobile number<span className="relative mt-2 block"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/><input type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} required maxLength={18} placeholder="+249 912 345 678" className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-3 text-gray-900 outline-none focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"/></span></label>
        {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">{error}</p>}{success && <p role="status" className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700 dark:bg-green-950/40 dark:text-green-300">{success}</p>}
        <button disabled={busy} className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"><Save size={18}/>{busy ? 'Saving…' : 'Save changes'}</button>
      </form>
      <div className="mt-8 border-t border-gray-200 pt-5 dark:border-gray-700"><div className="flex items-center gap-3 text-gray-600 dark:text-gray-300"><ShieldCheck className="text-indigo-500"/><span className="text-sm">Account type: <strong className="capitalize">{user?.role}</strong></span></div></div>
    </div>
  </main>;
}
