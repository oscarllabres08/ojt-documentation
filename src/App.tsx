import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Home } from './pages/Home';
import { UserDashboard } from './pages/UserDashboard';
import { MatrixBackground } from './components/MatrixBackground';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-slate-100">
        <MatrixBackground />
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <p className="text-emerald-200">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-slate-100 relative overflow-hidden">
      <MatrixBackground />
      <div className="relative z-10">
        {user ? <UserDashboard /> : <Home />}
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
