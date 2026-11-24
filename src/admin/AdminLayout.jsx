import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck, LogOut, ExternalLink, Activity,
  Globe, Sparkles, User, Bell
} from 'lucide-react';
import SwargBhramanLogo from '../components/SwargBhramanLogo';

export default function AdminLayout({ children }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleAdminLogout = async () => {
    await logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#070B19] text-slate-100 flex flex-col font-sans selection:bg-purple-500 selection:text-white">
      {/* Dedicated Administrative Shell Top Bar */}
      <header className="border-b border-purple-500/20 bg-[#0B132B]/95 backdrop-blur-xl sticky top-0 z-50 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4">
            
            {/* Left: Administrative Brand */}
            <div className="flex items-center gap-3">
              <Link to="/admin" className="flex items-center gap-2 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-amber-500 p-0.5 flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <div className="w-full h-full bg-[#0B132B] rounded-[10px] flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-purple-400" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-sm sm:text-base text-white tracking-tight">
                      SwargBhraman <span className="text-purple-400 font-serif">Command Nexus</span>
                    </span>
                    <span className="px-2 py-0.2 rounded-full text-[9px] font-black uppercase bg-purple-500/20 border border-purple-500/40 text-purple-300">
                      ADMIN
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 hidden sm:block">
                    Dedicated Administrative Management Perimeter
                  </span>
                </div>
              </Link>
            </div>

            {/* Right: Security Badge, User Profile & Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Active Root Security Clearance</span>
              </div>

              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-2.5 py-1 rounded-xl">
                <img
                  src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
                  alt={currentUser?.name || 'Admin'}
                  className="w-6 h-6 rounded-lg object-cover border border-purple-400/50"
                />
                <div className="hidden sm:block text-left text-xs">
                  <span className="font-bold text-white block leading-tight">{currentUser?.name || 'Administrator'}</span>
                  <span className="text-[10px] text-purple-300 font-mono leading-tight">{currentUser?.email || 'Administrator'}</span>
                </div>
              </div>

              {/* Link to Public Website */}
              <Link
                to="/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white text-xs font-bold transition flex items-center gap-1.5 border border-white/10"
                title="Open Public Travel Website in new tab"
              >
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">View Public Site</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </Link>

              {/* Admin Logout Button */}
              <button
                onClick={handleAdminLogout}
                className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 font-bold text-xs transition flex items-center gap-1.5 cursor-pointer"
                title="Exit and Sign Out of Admin Portal"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Exit Admin</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Admin Subsystem Content Area */}
      <main className="flex-1 w-full max-w-full">
        {children}
      </main>

      {/* Admin Dedicated Footer */}
      <footer className="border-t border-white/5 bg-[#060A17] py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-mono text-[11px] text-slate-400">
            SwargBhraman Uttarakhand Tourism Autonomous Administration Subsystem (Isolated Scope: /admin/*)
          </span>
          <span className="text-[10px] text-purple-400 font-semibold">
            Security Status: 256-Bit SSL Encrypted Admin Session
          </span>
        </div>
      </footer>
    </div>
  );
}
