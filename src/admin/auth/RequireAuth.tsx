import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/admin/auth/useAuth';

interface RequireAuthProps {
  requireAdmin?: boolean;
}

export const RequireAuth = ({ requireAdmin = true }: RequireAuthProps) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div className="min-h-screen grid place-items-center px-6">
        <div className="max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-900">Access denied</h1>
          <p className="mt-2 text-sm text-gray-600">
            You are logged in, but your account does not have admin permissions.
          </p>
        </div>
      </div>
    );
  }

  return <Outlet />;
};

