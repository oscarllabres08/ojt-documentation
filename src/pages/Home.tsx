import { FileText, Calendar, Image, BookOpen } from 'lucide-react';
import { Header } from '../components/Header';
import { LoginModal } from '../components/LoginModal';
import { RegistrationModal } from '../components/RegistrationModal';
import { useState } from 'react';

export function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <div className="min-h-screen bg-transparent">
      <Header onAdminClick={() => setShowLoginModal(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-black/60 border border-emerald-400/40 rounded-2xl shadow-md">
              <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-emerald-400" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-emerald-300 mb-4 sm:mb-6">
            OJT Documentation Platform
          </h1>
          <p className="text-lg sm:text-xl text-slate-200 max-w-2xl mx-auto mb-8 sm:mb-10">
            Track your On-the-Job Training journey day by day. Document your activities,
            upload photos, and keep a record of your learning experience.
          </p>
          <button
            onClick={() => setShowLoginModal(true)}
            className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg transition-colors text-lg"
          >
            Get Started
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-16 sm:mt-20">
          <div className="bg-black/70 rounded-xl p-6 sm:p-8 shadow-sm border border-emerald-500/20">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-emerald-300" />
            </div>
            <h3 className="text-xl font-semibold text-emerald-200 mb-2">Daily Tracking</h3>
            <p className="text-slate-200">
              Document your activities for each day of your OJT. Keep a detailed record
              of what you learned and accomplished.
            </p>
          </div>

          <div className="bg-black/70 rounded-xl p-6 sm:p-8 shadow-sm border border-emerald-500/20">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4">
              <Image className="w-6 h-6 text-emerald-300" />
            </div>
            <h3 className="text-xl font-semibold text-emerald-200 mb-2">Photo Gallery</h3>
            <p className="text-slate-200">
              Upload up to 5 images per documentation entry to showcase your work,
              workspace, or memorable moments.
            </p>
          </div>

          <div className="bg-black/70 rounded-xl p-6 sm:p-8 shadow-sm border border-emerald-500/20">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-emerald-300" />
            </div>
            <h3 className="text-xl font-semibold text-emerald-200 mb-2">Progress Journal</h3>
            <p className="text-slate-200">
              Build a comprehensive journal of your OJT experience. Review your growth
              and achievements over time.
            </p>
          </div>
        </div>

        <div className="mt-16 sm:mt-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-emerald-300 mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-black shadow-md">
                1
              </div>
              <h3 className="text-lg font-semibold text-emerald-200 mb-2">Register</h3>
              <p className="text-slate-200">Create your account to get started</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-black shadow-md">
                2
              </div>
              <h3 className="text-lg font-semibold text-emerald-200 mb-2">Document</h3>
              <p className="text-slate-200">Add your daily activities and upload photos</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-black shadow-md">
                3
              </div>
              <h3 className="text-lg font-semibold text-emerald-200 mb-2">Track</h3>
              <p className="text-slate-200">View your progress and documentation history</p>
            </div>
          </div>
        </div>
      </main>

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onSwitchToRegister={() => {
            setShowLoginModal(false);
            setShowRegisterModal(true);
          }}
        />
      )}

      {showRegisterModal && (
        <RegistrationModal
          onClose={() => setShowRegisterModal(false)}
          onSwitchToLogin={() => {
            setShowRegisterModal(false);
            setShowLoginModal(true);
          }}
        />
      )}
    </div>
  );
}
