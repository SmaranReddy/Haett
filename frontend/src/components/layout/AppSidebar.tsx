import { NavLink, type NavLinkRenderProps } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth.store';
import { ROUTES } from '@/utils/constants';
import { LayoutDashboard, FileText, Tag, Shield, X } from 'lucide-react';

const partnerNav = [
  { to: ROUTES.PARTNER_DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
  { to: ROUTES.PARTNER_APPLICATION, label: 'Application', icon: FileText },
  { to: ROUTES.PARTNER_CODES, label: 'Discount Codes', icon: Tag },
];

const adminNav = [
  { to: ROUTES.ADMIN_DASHBOARD, label: 'Dashboard', icon: Shield },
  { to: ROUTES.ADMIN_APPLICATIONS, label: 'Applications', icon: FileText },
  { to: ROUTES.ADMIN_CODES, label: 'Discount Codes', icon: Tag },
];

function NavItem({ to, label, icon: Icon, onClose }: { to: string; label: string; icon: React.ComponentType<{ className?: string }>; onClose?: () => void }) {
  return (
    <NavLink
      to={to}
      onClick={onClose}
      className={({ isActive }: NavLinkRenderProps) =>
        cn(
          'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
          isActive
            ? 'bg-brand-50 text-brand-700'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
        )
      }
    >
      {({ isActive }: NavLinkRenderProps) => (
        <>
          <Icon className="h-5 w-5" />
          {label}
          {isActive && <span className="sr-only">(current)</span>}
        </>
      )}
    </NavLink>
  );
}

interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AppSidebar({ isOpen, onClose }: AppSidebarProps) {
  const { role } = useAuthStore();
  const navItems = role === 'ADMIN' ? adminNav : partnerNav;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-200 lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
        aria-label="Sidebar"
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-bold text-white shadow-sm">
              P
            </div>
            <span className="text-base font-semibold tracking-tight text-gray-900">Partner Portal</span>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-4" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavItem key={item.to} to={item.to} label={item.label} icon={item.icon} onClose={onClose} />
          ))}
        </nav>

        <div className="border-t border-gray-100 p-4">
          <p className="text-xs text-gray-400 text-center">Partner Portal v1.0</p>
        </div>
      </aside>
    </>
  );
}
