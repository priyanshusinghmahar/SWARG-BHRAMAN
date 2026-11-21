import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import SafarNamaLogo from '../components/SafarNamaLogo';
import { useAuth } from '../context/AuthContext';
import { 
  Lock, Mail, User, ShieldCheck, Store, Compass, 
  ArrowRight, Sparkles, CheckCircle2, Eye, EyeOff, 
  KeyRound, AlertCircle, Loader2, RefreshCw, LogOut,
  ChevronRight, Shield, Send
} from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    currentUser, 
    isLoggedIn, 
    loginWithEmail, 
    signupWithEmail, 
    loginWithGoogle, 
    resetPassword, 
    loginDemo,
    logout 
  } = useAuth();

  const [activeTab, setActiveTab] = useState('signin'); // 'signin' | 'signup'
  const [selectedRole, setSelectedRole] = useState('traveler'); // 'traveler' | 'vendor' | 'admin'
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Password Reset Box Toggle
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSubmitting, setResetSubmitting] = useState(false);
  const [resetStatus, setResetStatus] = useState('');

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [studioName, setStudioName] = useState('');

  // Navigate according to role
  const navigateByRole = (role) => {
    if (role === 'vendor') {
      navigate('/portal/vendor');
    } else if (role === 'admin') {
      navigate('/portal/admin');
    } else {
      navigate('/portal/user');
    }
  };

  // Handle Firebase Email/Password Auth Form
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      if (activeTab === 'signin') {
        const res = await loginWithEmail(email, password, selectedRole);
        setSuccessMessage(`Welcome back, ${res.user.name}!`);
        setTimeout(() => {
          navigateByRole(res.user.role || selectedRole);
        }, 600);
      } else {
        // Registration
        const res = await signupWithEmail(
          email, 
          password, 
          fullName || 'Devbhoomi Explorer', 
          selectedRole,
          { phone, studioName }
        );
        setSuccessMessage(`Account created successfully! Welcome, ${res.user.name}.`);
        setTimeout(() => {
          navigateByRole(selectedRole);
        }, 700);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Authentication failed. Please check credentials or try demo login.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Firebase Google Sign-In
  const handleGoogleSignIn = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    setIsGoogleLoading(true);

    try {
      const res = await loginWithGoogle(selectedRole);
      setSuccessMessage(`Signed in with Google as ${res.user.name}!`);
      setTimeout(() => {
        navigateByRole(res.user.role || selectedRole);
      }, 600);
    } catch (err) {
      setErrorMessage(err.message || 'Google sign-in was interrupted. You can also use 1-Click Instant Demo Login.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // Handle Password Reset Request
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (!resetEmail) {
      setResetStatus('Please enter your account email address.');
      return;
    }
    setResetSubmitting(true);
    setResetStatus('');

    try {
      await resetPassword(resetEmail);
      setResetStatus('Password reset link has been dispatched to your email!');
    } catch (err) {
      setResetStatus(err.message || 'Could not send reset link. Please check the email.');
    } finally {
      setResetSubmitting(false);
    }
  };

  // Quick 1-Click Instant Demo Logins
  const handleDemoLogin = (role) => {
    setErrorMessage('');
    setSuccessMessage('');

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
    setSuccessMessage(`Instant Demo Active: Logged in as ${demoUser.name} (${role.toUpperCase()})`);
    setTimeout(() => {
      navigateByRole(role);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#080D1A] text-white flex items-center justify-center p-4 sm:p-6 relative overflow-hidden py-16">
      
      {/* Background Mountain Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[450px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[350px] bg-sky-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative max-w-xl w-full bg-[#0E172B]/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border border-amber-500/30 shadow-2xl animate-in fade-in zoom-in-95">
        
        {/* Brand Header */}
        <div className="text-center mb-8 flex flex-col items-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 hover:opacity-90 transition">
            <SafarNamaLogo size="md" />
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-bold uppercase tracking-wider mb-2">
            <Lock className="w-3 h-3 text-amber-400" />
            <span>Firebase Secure Authentication</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
            {activeTab === 'signin' ? 'Welcome Back to SafarNama' : 'Join the Mountain Collective'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md">
            Sign in to access digital Himalayan QR passes, artisan craft studios, or state governance portals.
          </p>
        </div>

        {/* Success Alert Banner */}
        {successMessage && (
          <div className="mb-6 p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span className="font-semibold">{successMessage}</span>
          </div>
        )}

        {/* Error Alert Banner */}
        {errorMessage && (
          <div className="mb-6 p-3.5 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-start justify-between gap-2 animate-in fade-in">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage('')}
              className="text-slate-400 hover:text-white text-xs px-1"
            >
              ✕
            </button>
          </div>
        )}

        {/* If already logged in, show quick active session card */}
        {isLoggedIn && currentUser && (
          <div className="mb-6 p-4 rounded-2xl bg-white/[0.04] border border-amber-400/40 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-xl object-cover border border-amber-400/50"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white font-serif">{currentUser.name}</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase">
                      {currentUser.role}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono block">{currentUser.email}</span>
                </div>
              </div>

              <button
                onClick={logout}
                className="px-2.5 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 rounded-lg text-xs font-semibold transition flex items-center gap-1"
              >
                <LogOut className="w-3 h-3" />
                <span>Logout</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
              <button
                onClick={() => navigate('/my-trips')}
                className="flex-1 py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-slate-300 font-semibold text-center"
              >
                🎟️ My Passes
              </button>
              <button
                onClick={() => navigateByRole(currentUser.role)}
                className="flex-1 py-1.5 px-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-[11px] text-amber-300 font-bold text-center"
              >
                🚀 Open Portal
              </button>
            </div>
          </div>
        )}

        {/* Google Authentication Button */}
        <div className="mb-5">
          <button
            type="button"
            onClick={handleGoogleSignIn}
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

        {/* Separator */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
            Or With Email & Password
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Role Selector Tabs */}
        <div className="mb-5">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2 text-center">
            Account Role:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'traveler', label: 'Traveler', icon: '🎒', color: 'border-blue-400 text-blue-300 bg-blue-500/10' },
              { id: 'vendor', label: 'Artisan / Host', icon: '🎨', color: 'border-amber-400 text-amber-300 bg-amber-500/10' },
              { id: 'admin', label: 'State Admin', icon: '🛡️', color: 'border-purple-400 text-purple-300 bg-purple-500/10' },
            ].map(r => (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedRole(r.id)}
                className={`p-2.5 rounded-2xl border text-center transition ${
                  selectedRole === r.id
                    ? `${r.color} font-bold shadow-lg ring-1 ring-amber-400/30 scale-102`
                    : 'bg-black/20 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                <div className="text-xl mb-0.5">{r.icon}</div>
                <div className="text-xs">{r.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Switcher: Sign In vs Sign Up */}
        <div className="flex bg-black/40 p-1 rounded-2xl border border-white/10 mb-6">
          <button
            type="button"
            onClick={() => {
              setActiveTab('signin');
              setErrorMessage('');
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'signin'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In to SafarNama
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('signup');
              setErrorMessage('');
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'signup'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Register New Account
          </button>
        </div>

        {/* Fast 1-Click Demo Logins */}
        <div className="mb-6 p-3.5 bg-black/40 rounded-2xl border border-amber-500/20">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              1-Click Instant Demo Login:
            </span>
            <span className="text-[10px] text-slate-400">Zero typing needed</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('traveler')}
              className="py-2 px-2 bg-blue-950/70 hover:bg-blue-900 border border-blue-500/30 text-blue-300 rounded-xl text-[11px] font-bold transition text-center"
            >
              🎒 Traveler
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('vendor')}
              className="py-2 px-2 bg-amber-950/70 hover:bg-amber-900 border border-amber-500/30 text-amber-300 rounded-xl text-[11px] font-bold transition text-center"
            >
              🎨 Artisan
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('admin')}
              className="py-2 px-2 bg-purple-950/70 hover:bg-purple-900 border border-purple-500/30 text-purple-300 rounded-xl text-[11px] font-bold transition text-center"
            >
              🛡️ Admin
            </button>
          </div>
        </div>

        {/* Authentication Form */}
        <form onSubmit={handleAuthSubmit} className="space-y-4 text-xs">
          {activeTab === 'signup' && (
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Priyanshu Singh Mahar"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'signup' && selectedRole === 'vendor' && (
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Studio / Craft Business Name</label>
              <div className="relative">
                <Store className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="e.g. Almora Aipan Heritage Studio"
                  value={studioName}
                  onChange={(e) => setStudioName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                placeholder={selectedRole === 'vendor' ? 'artisan@safarnama.in' : selectedRole === 'admin' ? 'admin@safarnama.in' : 'traveler@safarnama.in'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-black/40 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none"
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

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded bg-black/40 border-white/20 text-amber-500 focus:ring-0" />
              <span>Remember me on this device</span>
            </label>
            <button
              type="button"
              onClick={() => {
                setShowResetModal(!showResetModal);
                setResetEmail(email);
              }}
              className="text-amber-400 hover:underline cursor-pointer"
            >
              Forgot password?
            </button>
          </div>

          {/* Inline Forgot Password Box */}
          {showResetModal && (
            <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-amber-500/30 space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between text-xs text-amber-300 font-bold">
                <span className="flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Password Reset Email:</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowResetModal(false)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your registered email"
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-slate-950 rounded-2xl font-extrabold text-sm shadow-xl shadow-amber-950/40 transition flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
            <span>
              {activeTab === 'signin' 
                ? `Sign In as ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}` 
                : `Complete ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Registration`}
            </span>
          </button>
        </form>

        {/* Security & Return Links */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <Shield className="w-3.5 h-3.5" />
            <span>256-Bit SSL Firebase Protected</span>
          </div>
          <Link to="/" className="text-amber-300 font-bold hover:underline">
            ← Return to Explorer Home
          </Link>
        </div>

      </div>
    </div>
  );
}
