import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, X, Shield, Compass, Sparkles, Store, Mountain, Palette } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LogoutConfirmModal() {
  const navigate = useNavigate();
  const { currentUser, isLogoutModalOpen, closeLogoutModal, logout } = useAuth();

  if (!isLogoutModalOpen) return null;

  const handleConfirmLogout = async () => {
    closeLogoutModal();
    await logout();
    navigate('/');
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'guide':
        return { label: 'Certified Mountain Guide', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40', icon: Mountain };
      case 'vendor':
      case 'artisan':
        return { label: 'Native Artisan & Craftsman', color: 'bg-amber-500/20 text-amber-400 border-amber-500/40', icon: Palette };
      case 'shop':
        return { label: 'Local Mountain Shop Owner', color: 'bg-teal-500/20 text-teal-400 border-teal-500/40', icon: Store };
      case 'admin':
        return { label: 'Master Administrator', color: 'bg-purple-500/20 text-purple-400 border-purple-500/40', icon: Shield };
      default:
        return { label: 'Verified Explorer / Traveler', color: 'bg-sky-500/20 text-sky-400 border-sky-500/40', icon: Compass };
    }
  };

  const roleInfo = getRoleBadge(currentUser?.role);
  const RoleIcon = roleInfo.icon;

  return (
    <div 
      className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeLogoutModal();
      }}
    >
      {/* Mobile Bottom-Sheet & Desktop Centered Card */}
      <div 
        className="w-full sm:max-w-md bg-white dark:bg-[#0B1220] text-slate-900 dark:text-white rounded-t-[32px] sm:rounded-3xl p-6 sm:p-8 shadow-2xl border-t-2 sm:border-2 border-slate-200 dark:border-amber-500/40 animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200 space-y-5"
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-title"
      >
        {/* Mobile Swipe Bar Indicator */}
        <div className="w-12 h-1.5 rounded-full bg-slate-300 dark:bg-white/20 mx-auto -mt-2 mb-2 sm:hidden" />

        {/* Top Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-600 dark:text-rose-400 flex items-center justify-center shadow-inner">
              <LogOut className="w-6 h-6" />
            </div>
            <div>
              <h3 id="logout-title" className="text-lg sm:text-xl font-black font-serif tracking-tight">
                Sign Out of SwargBhraman?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                End active session on this device
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeLogoutModal}
            className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-500 dark:text-slate-300 flex items-center justify-center transition"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current Active Account Card */}
        {currentUser && (
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#070D18] border border-slate-200 dark:border-white/10 flex items-center gap-3">
            <img
              src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
              alt={currentUser.name}
              className="w-11 h-11 rounded-xl object-cover border border-amber-500/40 flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-sm text-slate-900 dark:text-white truncate">
                  {currentUser.name}
                </span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black border ${roleInfo.color}`}>
                  <RoleIcon className="w-2.5 h-2.5" />
                  <span>{roleInfo.label}</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5 font-mono">
                {currentUser.email}
              </p>
            </div>
          </div>
        )}

        <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-amber-500/5 dark:bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
          <p className="flex items-center gap-1.5 font-medium text-amber-800 dark:text-amber-300 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
            <span>Digital Passes & Saved Itineraries Safe</span>
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Your booked expeditions, QR passes, and shop orders will remain safely stored. You can sign back in anytime.
          </p>
        </div>

        {/* Action Buttons: Native Touch targets for Mobile */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            type="button"
            onClick={closeLogoutModal}
            className="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold border border-slate-300 dark:border-white/15 transition active:scale-95"
          >
            Stay Signed In
          </button>

          <button
            type="button"
            onClick={handleConfirmLogout}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white text-xs sm:text-sm font-black transition flex items-center justify-center gap-2 shadow-lg shadow-rose-950/30 active:scale-95 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
