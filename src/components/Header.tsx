import { FileText, LogIn } from 'lucide-react';
import { ReactNode } from 'react';

interface HeaderProps {
  onAdminClick: () => void;
  showAdminButton?: boolean;
  rightSlot?: ReactNode;
}

export function Header({ onAdminClick, showAdminButton = true, rightSlot }: HeaderProps) {
  return (
    <header className="bg-black/80 backdrop-blur text-emerald-100 sticky top-0 z-40 border-b border-emerald-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400 flex-shrink-0" />
            <h1 className="text-lg sm:text-2xl font-semibold tracking-tight truncate">OJT Documentation</h1>
          </div>
          {rightSlot
            ? rightSlot
            : showAdminButton && (
                <button
                  onClick={onAdminClick}
                  className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black rounded-lg transition-colors text-sm sm:text-base flex-shrink-0"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Login / Register</span>
                  <span className="sm:hidden">Login</span>
                </button>
              )}
        </div>
      </div>
    </header>
  );
}
