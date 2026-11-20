import React, { useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PahadiVibeLogo from './PahadiVibeLogo';
import LiveWeatherPill from './LiveWeatherPill';
import { 
  Compass, Sparkles, User, Store, ShieldCheck, Menu, X, 
  Ticket, MapPin, Heart, LogIn, LogOut, ChevronDown, Bell, CloudSun 
} from 'lucide-react';

export default function Navbar({ bookingsCount, onOpenBookingModal, onOpenWeatherModal }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout, isLoggedIn } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/destinations', label: 'Destinations' },
    { to: '/districts-haat', label: '13 Districts Haat', highlight: true },
    { to: '/temples-history', label: 'Temples & History' },
    { to: '/guides', label: 'Guides' },
    { to: '/my-trips', label: 'My Trips', badge: bookingsCount },
    { to: '/artisans', label: 'Artisans' },
    { to: '/events', label: 'Live Events' },
    { to: '/food-shops', label: 'Food & Sweets' },
    { to: '/map', label: 'GPS Traffic Map' },
    { to: '/ai-planner', label: 'AI Planner' },
    { to: '/personal-suggester', label: 'Personal Suggester', highlight: true },
    { to: '/weather', label: 'Live Weather' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/reviews', label: 'Reviews' },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-[#090F1B]/95 backdrop-blur-xl border-b border-amber-500/20 text-white shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo Component */}
          <Link
            to="/"
            className="cursor-pointer group hover:opacity-95 transition"
          >
            <PahadiVibeLogo size="md" />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden xl:flex items-center gap-1 bg-white/[0.04] px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md shadow-inner">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-full text-xs font-semibold transition flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-extrabold shadow-md'
                      : link.highlight
                      ? 'text-amber-400 hover:text-amber-300 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {link.highlight && <Sparkles className="w-3 h-3 text-amber-400 animate-spin" />}
                <span>{link.label}</span>
                {link.badge !== undefined && (
                  <span className="px-1.5 py-0.2 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-bold">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right Controls: Auth & CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            
            {/* Real-time Mountain Weather Pill */}
            <LiveWeatherPill onOpenWeatherModal={onOpenWeatherModal} />

            {/* Auth Login Button / User Profile Menu */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 bg-white/10 hover:bg-white/15 rounded-2xl border border-white/15 text-xs transition"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-xl object-cover"
                  />
                  <div className="text-left hidden lg:block">
                    <div className="font-bold text-white text-[11px] truncate max-w-[110px] leading-tight">
                      {currentUser.name.split(' ')[0]}
                    </div>
                    <div className="text-[9px] text-amber-400 uppercase font-semibold">
                      {currentUser.role}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Profile Dropdown */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#0E1627] border border-amber-500/30 rounded-2xl p-2 shadow-2xl text-xs space-y-1 animate-in fade-in z-50">
                    <div className="p-2 border-b border-white/10 mb-1">
                      <div className="font-bold text-white">{currentUser.name}</div>
                      <div className="text-slate-400 text-[10px] truncate">{currentUser.email}</div>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                        {currentUser.badge}
                      </span>
                    </div>

                    <Link
                      to="/my-trips"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10"
                    >
                      🎟️ My Booked Trips ({bookingsCount})
                    </Link>

                    {currentUser.role === 'vendor' && (
                      <Link
                        to="/portal/vendor"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="block px-3 py-2 rounded-xl text-rose-300 hover:text-white hover:bg-white/10"
                      >
                        🎨 Artisan Studio Portal
                      </Link>
                    )}

                    {currentUser.role === 'admin' && (
                      <Link
                        to="/portal/admin"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="block px-3 py-2 rounded-xl text-purple-300 hover:text-white hover:bg-white/10"
                      >
                        🛡️ Trust Admin Console
                      </Link>
                    )}

                    <Link
                      to="/login"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-3 py-2 rounded-xl text-amber-300 hover:text-white hover:bg-white/10"
                    >
                      🔄 Switch Account Role
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-950/40 flex items-center gap-1.5 font-bold"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 border border-white/20"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </Link>
            )}

            {/* Buy District Specialties CTA */}
            <Link
              to="/districts-haat"
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 rounded-xl text-xs font-extrabold transition shadow-lg shadow-amber-950/40 flex items-center gap-1.5"
            >
              <span>🛍️</span>
              <span className="hidden md:inline">Buy Specialties</span>
            </Link>

            {/* Book Trip Modal CTA */}
            <button
              onClick={() => onOpenBookingModal({})}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-blue-950/40"
            >
              Book Trip
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex xl:hidden items-center gap-2">
            {!isLoggedIn ? (
              <Link to="/login" className="p-2 bg-white/10 text-white rounded-xl text-xs font-bold">
                <LogIn className="w-4 h-4" />
              </Link>
            ) : (
              <Link to="/portal/user" className="p-2 bg-amber-500 text-slate-950 rounded-xl text-xs font-bold flex items-center gap-1">
                <User className="w-4 h-4" />
              </Link>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:bg-white/10"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0C121E] border-b border-amber-500/20 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2">
          
          {/* Mobile Live Weather Pill */}
          <div className="pb-2 border-b border-white/10 flex items-center justify-between">
            <LiveWeatherPill onOpenWeatherModal={(id) => {
              setMobileMenuOpen(false);
              onOpenWeatherModal?.(id);
            }} />
            <Link
              to="/weather"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-amber-400 font-bold hover:underline"
            >
              Full Forecast →
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1 pt-2">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `w-full text-left py-2 px-3 rounded-lg text-sm font-semibold transition flex items-center justify-between ${
                    isActive ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-white/5'
                  }`
                }
              >
                <span>{link.label}</span>
                {link.badge !== undefined && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          {/* Auth Button on Mobile */}
          <div className="pt-2 flex gap-2 border-t border-white/10">
            {!isLoggedIn ? (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-2.5 bg-white/10 text-white rounded-xl text-xs font-bold text-center border border-white/10"
              >
                Sign In / Register
              </Link>
            ) : (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2.5 bg-rose-950/60 border border-rose-500/30 text-rose-300 rounded-xl text-xs font-bold text-center"
              >
                Sign Out ({currentUser.name.split(' ')[0]})
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookingModal({});
              }}
              className="flex-1 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold rounded-xl text-xs text-center shadow"
            >
              Book Trip
            </button>
          </div>

        </div>
      )}
    </nav>
  );
}
