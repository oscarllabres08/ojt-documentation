import { X, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface LoginModalProps {
  onClose: () => void;
  onSwitchToRegister?: () => void;
}

export function LoginModal({ onClose, onSwitchToRegister }: LoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Sanitize username: remove spaces, special chars, and convert to lowercase
    // Use username@ojt.app format for Supabase (which requires email)
    const sanitizedUsername = username.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
    if (sanitizedUsername.length < 3) {
      setError('Invalid username format');
      setLoading(false);
      return;
    }
    const emailFormat = `${sanitizedUsername}@ojt.app`;
    const { error: signInError } = await signIn(emailFormat, password);

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-xl sm:rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-xl border border-emerald-500/30">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-emerald-200">Login</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-full transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-slate-300" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-200 mb-2 font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900 text-slate-100 rounded-lg border border-emerald-500/40 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label className="block text-slate-200 mb-2 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 bg-slate-900 text-slate-100 rounded-lg border border-emerald-500/40 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-900/60 border border-red-500 rounded-lg text-red-100">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-500/60 disabled:cursor-not-allowed text-black font-semibold rounded-lg transition-colors"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          {onSwitchToRegister && (
            <div className="text-center">
              <p className="text-slate-300 text-sm">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={onSwitchToRegister}
                  className="text-emerald-400 hover:text-emerald-300 font-medium"
                >
                  Sign Up
                </button>
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
