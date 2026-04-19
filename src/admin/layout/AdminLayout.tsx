import { useCallback } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '@/admin/auth/useAuth';

const links = [
  { to: '/admin', label: 'Overview', end: true },
  { to: '/admin/requests', label: 'Requests' },
  { to: '/admin/offers', label: 'Offers' },
  { to: '/admin/projects', label: 'Projects' },
  { to: '/admin/messages', label: 'Messages' },
  { to: '/admin/settings', label: 'Settings' },
];

export const AdminLayout = () => {
  const { auth, logout } = useAuth();

  const resolveNavLinkClassName = useCallback(({ isActive }: { isActive: boolean }) =>
    `block rounded-xl px-3 py-2 text-sm transition ${
      isActive
        ? 'bg-gray-900 text-white shadow-sm'
        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
    }`, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto grid min-h-screen max-w-360 grid-cols-1 lg:grid-cols-[260px_1fr]">
        <aside className="border-r border-gray-200 bg-white p-6">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">CodeGetIt</p>
            <h1 className="mt-1 text-2xl font-semibold text-gray-900">Admin Panel</h1>
          </div>

          <nav className="space-y-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={resolveNavLinkClassName}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-10 rounded-xl border border-gray-200 bg-gray-50 p-3">
            <p className="text-xs text-gray-500">Signed in as</p>
            <p className="truncate text-sm font-medium text-gray-900">{auth?.username}</p>
            <button
              type="button"
              onClick={logout}
              className="mt-3 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </aside>

        <main className="p-5 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};


