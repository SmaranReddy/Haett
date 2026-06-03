import { useAuthStore } from '@/store/auth.store';
import { Button } from '@/components/ui';
import { LogOut, Menu } from 'lucide-react';
import { useLogout } from '@/hooks';

interface AppHeaderProps {
  onMenuClick: () => void;
}

export function AppHeader({ onMenuClick }: AppHeaderProps) {
  const user = useAuthStore((s) => s.user);
  const logout = useLogout();

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white/80 backdrop-blur-xl px-6 sticky top-0 z-20">
      <button
        onClick={onMenuClick}
        className="-ml-2 flex h-10 w-10 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 lg:hidden"
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>
      <div className="hidden lg:block" />
      <div className="flex items-center gap-4">
        {user ? (
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900 truncate max-w-[140px]">{user.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user.role.toLowerCase()}</p>
          </div>
        ) : (
          <div className="text-right">
            <p className="text-sm text-gray-400">Signed out</p>
          </div>
        )}
        <Button variant="ghost" size="sm" onClick={logout}>
          <LogOut className="h-4 w-4 mr-1" />
          Logout
        </Button>
      </div>
    </header>
  );
}
