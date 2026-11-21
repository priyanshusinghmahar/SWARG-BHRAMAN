import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Lock, Mail, User, ShieldCheck, Store, Compass, 
  ArrowRight, Sparkles, CheckCircle2, Eye, EyeOff, 
  KeyRound, LogIn, LogOut, RefreshCw, Shield, ChevronRight,
  AlertCircle, Loader2, Send
} from 'lucide-react';

export default function LoginSection({ className = '', onLoginSuccess }) {
  const navigate = useNavigate();
  const { 
    currentUser, 
    loginWithEmail, 
    signupWithEmail, 
    loginWithGoogle, 
    resetPassword,
    loginDemo,
    logout, 
    isLoggedIn 
  } = useAuth();

  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup'
  const [selectedRole, setSelectedRole] = useState('traveler'); // 'traveler' | 'vendor' | 'admin'
  const [showPassword, setShowPassword] = useState(false);
  const [showSwitchView, setShowSwitchView] = useState(false);
  const [loginFeedback, setLoginFeedback] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Password reset inline state
  const [showResetBox, setShowResetBox] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetStatus, setResetStatus] = useState('');
  const [resetSubmitting, setResetSubmitting] = useState(false);

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [studioName, setStudioName] = useState('');
  const [phone, setPhone] = useState('');

  // Form submission handler with Firebase Auth
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoginFeedback('');
    setIsSubmitting(true);

    try {
      if (authMode === 'signin') {
        const res = await loginWithEmail(email, password, selectedRole);
        setLoginFeedback(`Signed in as ${res.user.name} (${res.user.role.toUpperCase()})`);
        setShowSwitchView(false);
        if (onLoginSuccess) onLoginSuccess(res.user);
      } else {
        const res = await signupWithEmail(
          email, 
          password, 
          fullName || 'Devbhoomi Explorer', 
          selectedRole,
          { studioName, phone }
        );
        setLoginFeedback(`Account registered successfully as ${res.user.name}!`);
        setShowSwitchView(false);
        if (onLoginSuccess) onLoginSuccess(res.user);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Firebase authentication failed. You can also use 1-Click Demo Login.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Google Login Handler
  const handleGoogleLogin = async () => {
    setErrorMessage('');
    setLoginFeedback('');
    setIsGoogleLoading(true);

    try {
      const res = await loginWithGoogle(selectedRole);
      setLoginFeedback(`Signed in with Google as ${res.user.name}!`);
      setShowSwitchView(false);
      if (onLoginSuccess) onLoginSuccess(res.user);
    } catch (err) {
      setErrorMessage(err.message || 'Google sign-in was interrupted. You can also use 1-Click Demo Login.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // Password Reset Handler
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (!resetEmail) {
      setResetStatus('Please enter your account email.');
      return;
    }
    setResetSubmitting(true);
    setResetStatus('');

    try {
      await resetPassword(resetEmail);
      setResetStatus('Password reset link sent to your email.');
    } catch (err) {
      setResetStatus(err.message || 'Could not send reset email.');
    } finally {
      setResetSubmitting(false);
    }
  };

  // 1-Click Fast Demo Role Login
  const handleDemoLogin = (role) => {
    setErrorMessage('');
    let demoUser;
    if (role === 'traveler') {
      demoUser = {
        id: 'usr-traveler-1',
        name: 'Priyanshu Singh Mahar',
        email: 'priyanshu@safarnama.in',
        role: 'traveler',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        badge: 'Verified Himalayan Explorer'
      };
    } else if (role === 'vendor') {
      demoUser = {
        id: 'usr-vendor-1',
        name: 'Meenakshi Joshi',
        email: 'meenakshi@aipanart.in',
        role: 'vendor',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        badge: 'Verified Master Aipan Artist'
      };
    } else if (role === 'admin') {
      demoUser = {
        id: 'usr-admin-1',
        name: 'State Trust Administrator',
        email: 'admin@safarnama.in',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        badge: 'State Trust Super Admin'
      };
    }

    loginDemo(demoUser);
    setLoginFeedback(`Demo Role Active: Logged in as ${demoUser.name} (${role.toUpperCase()})`);
    setShowSwitchView(false);

    if (onLoginSuccess) {
      onLoginSuccess(demoUser);
    }
  };

  const roles = [
    {
      id: 'traveler',
      label: 'Traveler Explorer',
      desc: 'Book tours, QR boarding passes & AI budget plans',
      icon: Compass,
      color: 'from-blue-600 to-indigo-600',
      activeBorder: 'border-blue-400 bg-blue-500/10 text-blue-300',
      badge: 'Explorer'
    },
    {
      id: 'vendor',
      label: 'Artisan / Homestay Host',
      desc: 'List village crafts, workshops & manage sales with 0% cut',
      icon: Store,
      color: 'from-amber-600 to-orange-600',
      activeBorder: 'border-amber-400 bg-amber-500/10 text-amber-300',
      badge: 'Artisan Partner'
    },
    {
      id: 'admin',
      label: 'State Trust Admin',
      desc: 'Tourism governance, verified guilds & helplines',
      icon: ShieldCheck,
      color: 'from-purple-600 to-emerald-600',
      activeBorder: 'border-purple-400 bg-purple-500/10 text-purple-300',
      badge: 'State Authority'
    }
  ];

  return (
    <section id="login-section" className={`py-16 bg-[#080D1A] text-white relative overflow-hidden ${className}`}>
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>SafarNama Gateway • Firebase Authentication & Portals</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight">
            Account Sign In & Role Portal Access
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Sign in with Firebase or choose a 1-click role to download digital Himalayan passes, manage artisan workshops, or access governance controls.
          </p>
        </div>

        {/* Feedback Alert if recently changed */}
        {loginFeedback && (
          <div className="max-w-2xl mx-auto mb-6 p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{loginFeedback}</span>
            </div>
            <button 
              onClick={() => setLoginFeedback('')}
              className="text-slate-400 hover:text-white text-xs px-2"
            >
              ✕
            </button>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="max-w-2xl mx-auto mb-6 p-3.5 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button 
              onClick={() => setErrorMessage('')}
              className="text-slate-400 hover:text-white text-xs px-2"
            >
              ✕
            </button>
          </div>
        )}

        {/* Active Session Card (If Logged In and Not Switching) */}
        {isLoggedIn && currentUser && !showSwitchView ? (
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#0F172A] via-[#121E36] to-[#0A101F] rounded-3xl p-6 sm:p-10 border border-amber-500/30 shadow-2xl space-y-8 backdrop-blur-xl">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400/50 shadow-lg"
                  />
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#0F172A] flex items-center justify-center text-[10px] text-white font-bold">
                    ✓
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                      {currentUser.name}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold uppercase tracking-wider">
                      {currentUser.role}
                    </span>
                    {currentUser.isFirebaseUser && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-semibold">
                        Firebase Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 font-mono">{currentUser.email}</p>
                  <p className="text-xs text-amber-400/90 font-semibold mt-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{currentUser.badge}</span>
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
                <button
                  onClick={() => setShowSwitchView(true)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/15 text-white rounded-xl text-xs font-semibold transition flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                  <span>Switch Role</span>
                </button>

                <button
                  onClick={() => {
                    logout();
                    setLoginFeedback('Successfully signed out.');
                  }}
                  className="px-4 py-2 bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-rose-300 rounded-xl text-xs font-semibold transition flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Quick Role Gateway Destinations */}
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
                Your Direct Hub Portals
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                
                {/* 1. My Trips Hub */}
                <Link
                  to="/my-trips"
                  className="p-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-amber-400/40 transition group flex flex-col justify-between"
                >
                  <div>
                    <div className="text-2xl mb-1.5 group-hover:scale-110 transition">🎟️</div>
                    <div className="font-bold text-white text-sm font-serif">My Booked Passes</div>
                    <p className="text-[11px] text-slate-400 mt-0.5">View QR boarding pass, host contacts & status</p>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-[11px] text-amber-400 font-bold">
                    <span>Open My Trips</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </Link>

                {/* 2. Role Specific Portal */}
                {currentUser.role === 'vendor' ? (
                  <Link
                    to="/portal/vendor"
                    className="p-4 rounded-2xl bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/30 hover:border-amber-400 transition group flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-2xl mb-1.5 group-hover:scale-110 transition">🎨</div>
                      <div className="font-bold text-white text-sm font-serif">Artisan Studio Portal</div>
                      <p className="text-[11px] text-amber-200 mt-0.5">Manage live craft listings & workshop bookings</p>
                    </div>
                    <div className="mt-4 flex items-center gap-1 text-[11px] text-amber-400 font-bold">
                      <span>Open Studio</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                ) : currentUser.role === 'admin' ? (
                  <Link
                    to="/portal/admin"
                    className="p-4 rounded-2xl bg-purple-500/10 hover:bg-purple-500/15 border border-purple-500/30 hover:border-purple-400 transition group flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-2xl mb-1.5 group-hover:scale-110 transition">🛡️</div>
                      <div className="font-bold text-white text-sm font-serif">State Trust Console</div>
                      <p className="text-[11px] text-purple-200 mt-0.5">Tourism volume, emergency response & trust audit</p>
                    </div>
                    <div className="mt-4 flex items-center gap-1 text-[11px] text-purple-300 font-bold">
                      <span>Open Console</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                ) : (
                  <Link
                    to="/portal/user"
                    className="p-4 rounded-2xl bg-blue-500/10 hover:bg-blue-500/15 border border-blue-500/30 hover:border-blue-400 transition group flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-2xl mb-1.5 group-hover:scale-110 transition">🧭</div>
                      <div className="font-bold text-white text-sm font-serif">Traveler Portal Hub</div>
                      <p className="text-[11px] text-blue-200 mt-0.5">Emergency SOS, guide chat & saved favorites</p>
                    </div>
                    <div className="mt-4 flex items-center gap-1 text-[11px] text-blue-300 font-bold">
                      <span>Open Traveler Portal</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                )}

                {/* 3. AI Budget Planner / Suggester */}
                <Link
                  to="/personal-suggester"
                  className="p-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-purple-400/40 transition group flex flex-col justify-between"
                >
                  <div>
                    <div className="text-2xl mb-1.5 group-hover:scale-110 transition">🎯</div>
                    <div className="font-bold text-white text-sm font-serif">Mountain Soul Suggester</div>
                    <p className="text-[11px] text-slate-400 mt-0.5">Retake personality vibe quiz & get match scores</p>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-[11px] text-purple-300 font-bold">
                    <span>Explore Vibes</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </Link>

              </div>
            </div>

            {/* Quick Switch Profiles Row */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <span className="text-xs text-slate-400">
                Want to test another portal role?
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleDemoLogin('traveler')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                    currentUser.role === 'traveler'
                      ? 'bg-blue-500/30 text-blue-300 border border-blue-400/50'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                  }`}
                >
                  🎒 Traveler (Priyanshu)
                </button>
                <button
                  onClick={() => handleDemoLogin('vendor')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                    currentUser.role === 'vendor'
                      ? 'bg-amber-500/30 text-amber-300 border border-amber-400/50'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                  }`}
                >
                  🎨 Artisan (Meenakshi)
                </button>
                <button
                  onClick={() => handleDemoLogin('admin')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                    currentUser.role === 'admin'
                      ? 'bg-purple-500/30 text-purple-300 border border-purple-400/50'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                  }`}
                >
                  🛡️ State Admin
                </button>
              </div>
            </div>

          </div>
        ) : (
          /* Login & Registration Form Card */
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#0C1425] via-[#101A30] to-[#090E1B] rounded-3xl border border-amber-500/30 shadow-2xl p-6 sm:p-10 backdrop-blur-xl">
            
            {/* Top Toggle & Return Option */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2 bg-black/40 p-1 rounded-2xl border border-white/10 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signin');
                    setErrorMessage('');
                  }}
                  className={`px-4 py-2 rounded-xl font-bold transition ${
                    authMode === 'signin'
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signup');
                    setErrorMessage('');
                  }}
                  className={`px-4 py-2 rounded-xl font-bold transition ${
                    authMode === 'signup'
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {isLoggedIn && showSwitchView && (
                <button
                  onClick={() => setShowSwitchView(false)}
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                >
                  <span>Return to Active Session ({currentUser.name})</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Google Firebase One-Click Button */}
            <div className="mb-6">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading}
                className="w-full py-3 px-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/20 hover:border-amber-400/50 text-white text-xs font-bold transition flex items-center justify-center gap-3 shadow-lg disabled:opacity-50"
              >
                {isGoogleLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                )}
                <span>Continue with Google (Firebase)</span>
              </button>
            </div>

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                Or Continue With Email & Password
              </span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Role Selector Grid */}
            <div className="space-y-3 mb-8">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                1. Select Your Account Role
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {roles.map(r => {
                  const Icon = r.icon;
                  const isSelected = selectedRole === r.id;

                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setSelectedRole(r.id)}
                      className={`p-4 rounded-2xl text-left border transition relative flex flex-col justify-between ${
                        isSelected
                          ? `${r.activeBorder} shadow-lg ring-1 ring-amber-400/40`
                          : 'bg-white/[0.03] border-white/10 hover:border-white/20 text-slate-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center bg-white/10 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          )}
                        </div>
                        <div className="font-bold text-white text-sm font-serif">{r.label}</div>
                        <p className="text-[11px] text-slate-400 mt-1 leading-snug">{r.desc}</p>
                      </div>

                      <div className="mt-3 text-[10px] uppercase font-bold text-slate-400">
                        {r.badge}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick 1-Click Demo Profiles (Zero typing needed) */}
            <div className="mb-8 p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                  <span>Quick 1-Click Instant Demo Login</span>
                </span>
                <span className="text-[11px] text-slate-400">No password required</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleDemoLogin('traveler')}
                  className="p-3 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-left transition flex items-center justify-between group"
                >
                  <div>
                    <span className="text-xs font-bold text-white block">Traveler Account</span>
                    <span className="text-[10px] text-blue-300">Priyanshu Singh Mahar</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 transition" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoLogin('vendor')}
                  className="p-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-left transition flex items-center justify-between group"
                >
                  <div>
                    <span className="text-xs font-bold text-white block">Master Artisan</span>
                    <span className="text-[10px] text-amber-300">Meenakshi Joshi (Aipan)</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 transition" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoLogin('admin')}
                  className="p-3 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-left transition flex items-center justify-between group"
                >
                  <div>
                    <span className="text-xs font-bold text-white block">State Admin</span>
                    <span className="text-[10px] text-purple-300">Devbhoomi Trust</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 transition" />
                </button>
              </div>
            </div>

            {/* Authentication Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                2. Or Enter Email & Password
              </span>

              {authMode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priyanshu Singh Mahar"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/15 rounded-xl text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {authMode === 'signup' && selectedRole === 'vendor' && (
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Village Studio or Homestay Name
                  </label>
                  <div className="relative">
                    <Store className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. Almora Aipan Heritage Studio"
                      value={studioName}
                      onChange={(e) => setStudioName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/15 rounded-xl text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      placeholder={selectedRole === 'vendor' ? 'artisan@safarnama.in' : selectedRole === 'admin' ? 'admin@safarnama.in' : 'traveler@safarnama.in'}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/15 rounded-xl text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="At least 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 bg-black/40 border border-white/15 rounded-xl text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3 text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded bg-black/40 border-white/20 text-amber-500 focus:ring-0"
                  />
                  <span>Keep me signed in on this device</span>
                </label>

                <button
                  type="button"
                  onClick={() => {
                    setShowResetBox(!showResetBox);
                    setResetEmail(email);
                  }}
                  className="text-amber-400 hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              {/* Inline Forgot Password Box */}
              {showResetBox && (
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-amber-500/30 space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between text-xs text-amber-300 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Password Reset Email:</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowResetBox(false)}
                      className="text-slate-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Enter registered email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="flex-1 px-3 py-2 bg-black/50 border border-white/15 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400 font-mono"
                    />
                    <button
                      type="button"
                      onClick={handlePasswordReset}
                      disabled={resetSubmitting}
                      className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs transition disabled:opacity-50"
                    >
                      {resetSubmitting ? 'Sending...' : 'Send'}
                    </button>
                  </div>

                  {resetStatus && (
                    <p className="text-[11px] text-amber-200 mt-1">{resetStatus}</p>
                  )}
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold text-sm transition shadow-xl shadow-amber-950/40 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  ) : (
                    <LogIn className="w-4 h-4" />
                  )}
                  <span>
                    {authMode === 'signin' 
                      ? `Sign In as ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}` 
                      : `Register as ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Shield className="w-3.5 h-3.5" />
                    <span>Firebase Auth & 256-Bit SSL</span>
                  </span>
                  <span>•</span>
                  <span>0% Cut to Native Artisans</span>
                </div>
              </div>
            </form>

          </div>
        )}

      </div>
    </section>
  );
}
