import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function GuestRoute() {
  const { user, isLoading } = useAuth();
  if (isLoading) return <div className="flex min-h-[45vh] items-center justify-center text-gray-600 dark:text-gray-300">Checking your session…</div>;
  return user ? <Navigate to="/account" replace /> : <Outlet />;
}
