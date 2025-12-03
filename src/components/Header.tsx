import { Car, LogIn } from 'lucide-react';

interface HeaderProps {
  onAdminClick: () => void;
  showAdminButton?: boolean;
}

export function Header({ onAdminClick, showAdminButton = true }: HeaderProps) {
  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Car className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 flex-shrink-0" />
            <h1 className="text-lg sm:text-2xl font-bold tracking-tight truncate">VELOCITY MOTORS</h1>
          </div>
          {showAdminButton && (
            <button
              onClick={onAdminClick}
              className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm sm:text-base flex-shrink-0"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">Admin Login</span>
              <span className="sm:hidden">Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
