import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SwargBhramanLogo from './SwargBhramanLogo';
import LiveWeatherPill from './LiveWeatherPill';
import ThemeToggleButton from './ThemeToggleButton';
import { 
  Compass, Sparkles, User, Store, ShieldCheck, Menu, X, 
  Ticket, MapPin, Heart, LogIn, LogOut, ChevronDown, Bell, CloudSun,
  Flame, ShoppingBag, Mountain, Map, Camera, Star, Award, Layers
} from 'lucide-react';

export default function Navbar({ bookingsCount, onOpenBookingModal, onOpenWeatherModal }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout, openLogoutModal, isLoggedIn } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  const moreDropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(e.target)) {
        setMoreDropdownOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Streamlined primary navigation links tailored for 100% responsive desktop scaling
  const primaryNavLinks = [
    { to: '/tour-plans', label: 'Tour Plans', highlight: true },
    { to: '/map', label: 'Live Map 🚦' },
    { to: '/events', label: 'Live Aarti 🔥' },
    { to: '/donate', label: 'Seva & Daan' },
    { to: '/support', label: 'Help Desk 🎧' },
  ];

  // Secondary pages housed under the sleek "Explore More" dropdown
  const secondaryNavLinks = [
    { to: '/portal/provider', label: 'Provider Portal (Guides & Artisans)', icon: '🧭', desc: 'Direct portal for mountain guides and local craftsmen with zero commission' },
    { to: '/support', label: 'Help Support / Help Desk', icon: '🎧', desc: 'Direct live chat with Admin, Mail & WhatsApp help desk' },
    { to: '/admin', label: 'Admin Command Nexus', icon: '🛡️', desc: 'Central Control Center, Tour & Portal Management' },
    { to: '/my-trips', label: 'My Booked Trips & Passes', icon: '🎟️', desc: 'Digital QR passes & explorer itinerary' },
    { to: '/tour-plans', label: 'Curated Tour Plans & Itineraries', icon: '🧭', desc: 'Day-by-day certified Himalayan routes' },
    { to: '/merchandise', label: 'Official Merchandise Store', icon: '🛍️', desc: 'Hoodies, caps, pure copperware & journals' },
    { to: '/donate', label: 'Devbhoomi Seva & Temple Daan', icon: '🪔', desc: 'Sacred offerings with digital certificates' },
    { to: '/reviews', label: 'Traveler Reviews & Photo Wall', icon: '⭐', desc: 'Real experiences & uploaded trail captures' },
    { to: '/personal-suggester', label: 'Mountain Soul Suggester', icon: '🎯', desc: 'Find your travel vibe with personality quiz' },
    { to: '/weather', label: 'Live Weather & Forecast', icon: '⛅', desc: 'Real-time mountain temps & snowfall reports' },
    { to: '/districts-haat', label: '13 Districts Direct Haat', icon: '🛒', desc: 'Authentic GI-tagged crafts direct from native artisans' },
    { to: '/temples-history', label: 'Temples & History', icon: '🛕', desc: '14 ancient Jyotirlingas & Katyuri legends' },
    { to: '/artisans', label: 'Artisans & Crafts', icon: '🎨', desc: 'Aipan, copperware & sheep-wool weavers' },
    { to: '/guides', label: 'Mountain Guides & Scouts', icon: '🏔️', desc: 'NIM certified trek leaders & local narrators' },
    { to: '/events', label: 'Live Ganga Aarti & Fairs', icon: '🔥', desc: 'Haridwar & Rishikesh live ceremonies' },
    { to: '/food-shops', label: 'Famous Food & Sweets', icon: '🍬', desc: 'Bal Mithai, Singodi & Pahadi Thali' },
    { to: '/map', label: 'GPS & Traffic Highway Map', icon: '🚦', desc: 'Live road conditions & Char Dham routes' },
    { to: '/gallery', label: 'Himalayan Photo Gallery', icon: '📸', desc: 'Curated high-res Devbhoomi captures' },
    { to: '/login', label: 'Traveler Pass & Profile', icon: '🪪', desc: 'Digital QR passes, trip itineraries & explorer profile' }
  ];

  // Role-filtered secondary links so visitors, travelers, and vendors only see what they are authorized for
  const userRole = currentUser?.role || 'visitor';
  const filteredSecondaryNavLinks = secondaryNavLinks.filter(sec => {
    if (sec.to === '/admin' || sec.to === '/portal/admin') return userRole === 'admin';
    if (sec.to === '/portal/provider') return userRole === 'admin' || userRole === 'vendor' || userRole === 'guide';
    if (sec.to === '/my-trips' || sec.to === '/portal/user') return userRole === 'admin' || userRole === 'traveler';
    return true;
  });

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-[#070B18] border-b border-slate-200 dark:border-amber-500/30 text-slate-900 dark:text-white shadow-md transition-colors duration-300 w-full">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-4 lg:px-4 xl:px-6 2xl:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-1.5 sm:gap-2">
          
          {/* Brand Logo */}
          <Link
            to="/"
            className="cursor-pointer group hover:opacity-95 transition flex-shrink-0"
          >
            <SwargBhramanLogo size="sm" showSubtitle={false} className="shrink-0" />
          </Link>

          {/* Clean Desktop Navigation Menu (Consolidated & Non-Overflowing across all laptop sizes) */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1 bg-slate-100 dark:bg-[#0D1527] px-1 xl:px-2 py-0.5 xl:py-1 rounded-full border border-slate-300 dark:border-amber-500/30 shadow-md shrink-0">
            {primaryNavLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-1.5 xl:px-2.5 py-0.5 xl:py-1 rounded-full text-[10.5px] xl:text-xs font-semibold transition items-center gap-1 whitespace-nowrap flex ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-extrabold shadow-md'
                      : link.highlight
                      ? 'text-amber-900 dark:text-amber-300 hover:text-amber-950 dark:hover:text-amber-200 font-extrabold hover:bg-amber-100 dark:hover:bg-[#15203A]'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/80 dark:text-slate-200 dark:hover:text-white dark:hover:bg-[#15203A]'
                  }`
                }
              >
                {link.highlight && <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400 animate-spin" />}
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-1.5 py-0.2 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-900 dark:text-amber-300 text-[9px] font-bold">
                    {link.badge}
                  </span>
                )}
                {link.badgeCount !== undefined && link.badgeCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-blue-500 text-white text-[9px] font-bold">
                    {link.badgeCount}
                  </span>
                )}
              </NavLink>
            ))}

            {/* "Explore More ▾" Dropdown (100% Solid Non-Transparent Card) */}
            <div className="relative" ref={moreDropdownRef}>
              <button
                type="button"
                onClick={() => setMoreDropdownOpen(prev => !prev)}
                className={`px-1.5 xl:px-2.5 py-0.5 xl:py-1 rounded-full text-[10.5px] xl:text-xs font-bold transition flex items-center gap-1 whitespace-nowrap cursor-pointer ${
                  moreDropdownOpen 
                    ? 'bg-amber-500 text-slate-950 font-black shadow-md' 
                    : 'text-slate-800 hover:text-slate-950 hover:bg-slate-200 dark:text-slate-200 dark:hover:text-white dark:hover:bg-[#15203A]'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                <span>Explore More</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${moreDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {moreDropdownOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-[#0B1328] border-2 border-slate-300 dark:border-amber-500/50 rounded-3xl p-3 shadow-2xl z-[70] divide-y divide-slate-200 dark:divide-slate-800 animate-in fade-in-50 zoom-in-95 duration-150">
                  <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center justify-between">
                    <span>All Dedicated Pages</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Click to open</span>
                  </div>

                  <div className="py-1 max-h-96 overflow-y-auto space-y-0.5">
                    {filteredSecondaryNavLinks.map(sec => (
                      <NavLink
                        key={sec.to}
                        to={sec.to}
                        onClick={() => setMoreDropdownOpen(false)}
                        className={({ isActive }) =>
                          `p-2.5 rounded-2xl flex items-start gap-3 transition ${
                            isActive
                              ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                              : 'hover:bg-slate-100 dark:hover:bg-[#131E38] text-slate-800 dark:text-slate-200'
                          }`
                        }
                      >
                        <span className="text-xl mt-0.5">{sec.icon}</span>
                        <div>
                          <div className="text-xs font-bold font-serif text-slate-900 dark:text-white">{sec.label}</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">{sec.desc}</div>
                        </div>
                      </NavLink>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Action Controls - Guaranteed Non-Overflowing across all laptop and desktop resolutions */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2 flex-shrink-0">
            
            {/* Live Mountain Weather Pill on Desktop screens (kept inside mobile drawer & Explore More for smaller devices) */}
            <div className="hidden xl:flex items-center">
              <LiveWeatherPill onOpenWeatherModal={onOpenWeatherModal} />
            </div>

            {/* Light / Dark Mode Toggle Button */}
            <ThemeToggleButton variant="icon" />

            {/* Auth Sign In / User Profile */}
            {isLoggedIn && currentUser ? (
              <div className="relative" ref={profileDropdownRef}>
                <button
                  type="button"
                  id="user-profile-menu-button"
                  aria-label="Toggle user profile menu"
                  aria-expanded={profileDropdownOpen}
                  onClick={() => setProfileDropdownOpen(prev => !prev)}
                  className={`flex items-center gap-1.5 p-1 sm:px-2 sm:py-1 rounded-xl border text-xs transition shadow-sm cursor-pointer ${
                    profileDropdownOpen
                      ? 'bg-amber-500 text-slate-950 border-amber-600 font-bold'
                      : 'bg-slate-100 dark:bg-[#0D1527] hover:bg-slate-200 dark:hover:bg-[#131F38] border-slate-300 dark:border-amber-500/30 text-slate-900 dark:text-white'
                  }`}
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-lg object-cover border border-amber-400/50"
                  />
                  <span className="font-bold text-slate-900 dark:text-white text-xs hidden 2xl:inline">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                </button>

                {/* Profile Dropdown (100% Solid Non-Transparent Card with Prominent Sign Out) */}
                {profileDropdownOpen && (
                  <div 
                    id="user-profile-dropdown"
                    className="absolute right-0 mt-3 w-72 sm:w-80 bg-white dark:bg-[#0B1328] border-2 border-slate-300 dark:border-amber-500/50 rounded-3xl p-4 shadow-2xl z-[80] text-xs space-y-3 text-slate-900 dark:text-white animate-in fade-in-50 zoom-in-95 duration-150"
                  >
                    <div className="p-3 bg-slate-100 dark:bg-[#070B18] rounded-2xl border border-slate-200 dark:border-amber-500/30 shadow-inner">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-950 dark:text-white font-serif text-sm">{currentUser.name}</span>
                        <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase">
                          {currentUser.role}
                        </span>
                      </div>
                      <div className="text-slate-600 dark:text-slate-300 text-[11px] truncate font-mono mt-0.5">{currentUser.email}</div>
                      {currentUser.badge && (
                        <div className="mt-1.5 text-[10px] text-amber-700 dark:text-amber-300 font-bold flex items-center gap-1">
                          <span>🏅</span>
                          <span>{currentUser.badge}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <Link
                        to="/login"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="w-full text-left px-3 py-2 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#131E38] flex items-center gap-2 font-medium transition"
                      >
                        <User className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                        <span>Profile &amp; Security Details</span>
                      </Link>

                      {(userRole === 'admin' || userRole === 'traveler') && (
                        <Link
                          to="/my-trips"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="w-full text-left px-3 py-2 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#131E38] flex items-center gap-2 font-medium transition"
                        >
                          <Ticket className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                          <span>My QR Boarding Passes</span>
                        </Link>
                      )}

                      {(userRole === 'admin' || userRole === 'traveler') && (
                        <Link
                          to="/portal/user"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="w-full text-left px-3 py-2 rounded-xl text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-[#131E38] flex items-center gap-2 font-bold transition"
                        >
                          <Compass className="w-3.5 h-3.5 text-amber-500" />
                          <span>Traveler Explorer Hub</span>
                        </Link>
                      )}

                      {(userRole === 'admin' || userRole === 'vendor' || userRole === 'guide') && (
                        <Link
                          to={currentUser?.role === 'guide' ? '/portal/provider?role=guide' : currentUser?.role === 'vendor' ? '/portal/provider?role=vendor' : '/portal/provider'}
                          onClick={() => setProfileDropdownOpen(false)}
                          className="w-full text-left px-3 py-2 rounded-xl text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-[#131E38] flex items-center gap-2 font-bold transition"
                        >
                          <Compass className="w-3.5 h-3.5 text-emerald-500" />
                          <span>
                            {currentUser?.role === 'guide'
                              ? '🧭 Mountain Guide Portal'
                              : currentUser?.role === 'vendor'
                              ? '🎨 Artisan & Vendor Portal'
                              : '🧭 Provider Portal (Guides & Artisans)'}
                          </span>
                        </Link>
                      )}

                      {userRole === 'admin' && (
                        <Link
                          to="/admin"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="w-full text-left px-3 py-2 rounded-xl text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-[#131E38] flex items-center gap-2 font-bold transition"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-purple-500" />
                          <span>🛡️ Master Admin Nexus</span>
                        </Link>
                      )}

                      <Link
                        to="/districts-haat"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="w-full text-left px-3 py-2 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#131E38] flex items-center gap-2 font-medium transition"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-amber-500" />
                        <span>13 Districts Direct Haat</span>
                      </Link>
                    </div>

                    {/* Prominent Sign Out Button */}
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                      <button
                        type="button"
                        id="user-sign-out-button"
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          openLogoutModal();
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition flex items-center justify-between cursor-pointer shadow-md"
                      >
                        <span className="flex items-center gap-2">
                          <LogOut className="w-4 h-4 text-white" />
                          <span>Sign Out</span>
                        </span>
                        <span className="text-[10px] uppercase font-black bg-rose-800 text-white px-2 py-0.5 rounded-md">
                          Exit
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-3 sm:px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-md border-0 cursor-pointer whitespace-nowrap"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </Link>
            )}

            {/* Book Trip Modal CTA */}
            <button
              onClick={() => onOpenBookingModal({})}
              className="shrink-0 px-2.5 xl:px-3.5 py-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-black rounded-xl text-xs transition shadow-md shadow-amber-950/20 whitespace-nowrap cursor-pointer flex items-center gap-1 xl:gap-1.5"
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>Book Trip</span>
            </button>
          </div>

          {/* Mobile Right Controls: Weather, Mode Toggle, Sign-in & Menu Toggle */}
          <div className="flex lg:hidden items-center gap-1 sm:gap-1.5 flex-shrink-0">
            {/* Live Temperature Pill on Mobile */}
            <div className="flex items-center">
              <LiveWeatherPill onOpenWeatherModal={onOpenWeatherModal} />
            </div>

            <ThemeToggleButton variant="icon" />
            
            {!isLoggedIn ? (
              <Link to="/login" className="p-2 bg-amber-50 border border-amber-300 text-amber-700 dark:bg-amber-500/20 dark:border-amber-500/40 dark:text-amber-300 rounded-xl text-xs font-bold" title="Sign In">
                <LogIn className="w-4 h-4" />
              </Link>
            ) : (
              <button 
                type="button" 
                onClick={openLogoutModal}
                className="p-1.5 bg-amber-500 text-slate-950 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                title={`${currentUser.name} (Click to manage session)`}
              >
                <img src={currentUser.avatar} alt="avatar" className="w-5 h-5 rounded-lg object-cover" />
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10 transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-amber-600 dark:text-amber-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu (Accessible, Clean, All Pages Listed - 100% Solid Non-Transparent) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#070B18] border-b-2 border-slate-300 dark:border-amber-500/40 px-4 pt-3 pb-8 space-y-4 animate-in slide-in-from-top-2 max-h-[85vh] overflow-y-auto text-slate-900 dark:text-white shadow-2xl">
          
          {/* Mobile Theme Mode Switch */}
          <ThemeToggleButton variant="switch" />

          {/* Mobile Live Weather Pill */}
          <div className="pb-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <LiveWeatherPill onOpenWeatherModal={(id) => {
              setMobileMenuOpen(false);
              onOpenWeatherModal?.(id);
            }} />
            <Link
              to="/weather"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-amber-700 dark:text-amber-400 font-bold hover:underline"
            >
              Full Forecast →
            </Link>
          </div>

          {/* Primary Quick Links */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-2 block">
              Core Navigation
            </span>
            {primaryNavLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `w-full text-left py-2 px-3 rounded-xl text-sm font-semibold transition flex items-center justify-between ${
                    isActive ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-[#131E38]'
                  }`
                }
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-300 text-xs font-bold">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          {/* Secondary Specialized Pages */}
          <div className="space-y-1 pt-2 border-t border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-2 block">
              All Specialized Pages
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {filteredSecondaryNavLinks.map(sec => (
                <NavLink
                  key={sec.to}
                  to={sec.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `p-2.5 rounded-xl text-xs font-medium transition flex items-center gap-2.5 ${
                      isActive ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-[#131E38]'
                    }`
                  }
                >
                  <span className="text-lg">{sec.icon}</span>
                  <div>
                    <div className="font-semibold text-slate-950 dark:text-white">{sec.label}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">{sec.desc}</div>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>

          {/* Mobile Footer CTAs & Sign Out */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookingModal({});
              }}
              className="w-full py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-black rounded-xl text-xs shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Ticket className="w-4 h-4" />
              <span>Book Trip / Expedition Pass</span>
            </button>

            {isLoggedIn ? (
              <div className="space-y-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-3 bg-slate-100 dark:bg-[#0D1528] border border-slate-300 dark:border-amber-500/40 text-slate-900 dark:text-white text-center font-bold rounded-xl text-xs flex items-center justify-center gap-2"
                >
                  <img src={currentUser.avatar} alt="avatar" className="w-4 h-4 rounded-full object-cover" />
                  <span>Profile: {currentUser.name} ({currentUser.role})</span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openLogoutModal();
                  }}
                  className="w-full py-2.5 px-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-white" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-center font-black rounded-xl text-xs shadow-md transition"
              >
                Traveler Pass &amp; Sign In
              </Link>
            )}
          </div>

        </div>
      )}
    </nav>
  );
}
