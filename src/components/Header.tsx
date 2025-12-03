import { Car, LogIn } from 'lucide-react';

interface HeaderProps {
  onAdminClick: () => void;
  showAdminButton?: boolean;
}

export function Header({ onAdminClick, showAdminButton = true }: HeaderProps) {
  return (
    <header className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Car className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold tracking-tight">VELOCITY MOTORS</h1>
          </div>
          {showAdminButton && (
            <button
              onClick={onAdminClick}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span>Admin Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
