import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ roles }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  if (isLoading) return <div className="flex min-h-[45vh] items-center justify-center text-gray-600 dark:text-gray-300">Checking your session…</div>;
  if (!user) return <Navigate to="/signin" replace state={{ from: location }} />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return <Outlet />;
}
