import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, ShieldCheck, UserRound } from 'lucide-react';

export default function Account() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  function handleLogout() { logout(); navigate('/', { replace: true }); }
  return <main className="mx-auto min-h-[65vh] max-w-5xl px-4 py-12">
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div><p className="text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Your account</p><h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">Hello, {user?.name}</h1><p className="mt-1 text-gray-500 dark:text-gray-400">Manage your StoreHub session and account details.</p></div>
        <button onClick={handleLogout} className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2.5 font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"><LogOut size={18}/> Sign out</button>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-gray-50 p-5 dark:bg-gray-900"><UserRound className="mb-3 text-indigo-500"/><p className="text-xs font-semibold uppercase text-gray-500">Name</p><p className="mt-1 font-medium text-gray-900 dark:text-white">{user?.name}</p></div>
        <div className="rounded-xl bg-gray-50 p-5 dark:bg-gray-900"><p className="mb-3 text-indigo-500">@</p><p className="text-xs font-semibold uppercase text-gray-500">Email</p><p className="mt-1 break-all font-medium text-gray-900 dark:text-white">{user?.email}</p></div>
        <div className="rounded-xl bg-gray-50 p-5 dark:bg-gray-900"><ShieldCheck className="mb-3 text-indigo-500"/><p className="text-xs font-semibold uppercase text-gray-500">Account role</p><p className="mt-1 font-medium capitalize text-gray-900 dark:text-white">{user?.role}</p></div>
      </div>
    </div>
  </main>;
}
