import { LogOut } from 'lucide-react';
import { useLogout } from '@/hooks';

export function LogoutButton() {
  const logout = useLogout();

  return (
    <button
      onClick={logout}
      className="fixed top-4 right-4 z-50 inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white/80 px-3 py-2 text-sm font-medium text-red-600 shadow-sm backdrop-blur-sm transition-all duration-150 hover:border-red-300 hover:bg-red-50 active:bg-red-100"
      aria-label="Logout"
    >
      <LogOut className="h-4 w-4" />
      <span className="hidden sm:inline">Logout</span>
    </button>
  );
}
