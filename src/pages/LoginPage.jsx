import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import SwargBhramanLogo from '../components/SwargBhramanLogo';
import CompleteProfileModal from '../components/CompleteProfileModal';
import { useAuth } from '../context/AuthContext';
import { 
  Lock, Mail, User, Compass, 
  ArrowRight, CheckCircle2, Eye, EyeOff, 
  AlertCircle, Loader2, LogOut,
  Shield, Send, Phone, MapPin, Edit3, Ticket, ArrowLeft
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
    updateUserDetails,
    openLogoutModal
  } = useAuth();

  const [activeTab, setActiveTab] = useState('signin'); // 'signin' | 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Profile Details Completion Modal (Triggered after Google Auth or manual edit)
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [tempProfileUser, setTempProfileUser] = useState(null);

  // Password Reset Box Toggle
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSubmitting, setResetSubmitting] = useState(false);
  const [resetStatus, setResetStatus] = useState('');

  // Form fields (Strictly Traveler)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [homeCity, setHomeCity] = useState('');
  const [travelPreference, setTravelPreference] = useState('Trekking & High Altitude Passes');

  // Handle Firebase Email/Password Auth Form (Traveler Only)
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      if (activeTab === 'signin') {
        const res = await loginWithEmail(email, password, 'traveler');
        setSuccessMessage(`Welcome back, ${res.user.name}!`);
        setTimeout(() => {
          navigate('/portal/user');
        }, 500);
      } else {
        // Traveler registration
        const extraData = {
          phone,
          homeCity,
          travelPreference,
          emergencyContact: ''
        };

        const res = await signupWithEmail(
          email, 
          password, 
          fullName || 'Devbhoomi Explorer',
          'traveler',
          extraData
        );

        setSuccessMessage(`Traveler account registered! Welcome, ${res.user.name}.`);
        setTimeout(() => {
          navigate('/portal/user');
        }, 600);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Authentication failed. Please verify your email and password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Google Sign-In for Traveler
  const handleGoogleSignIn = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    setIsGoogleLoading(true);

    try {
      const res = await loginWithGoogle('traveler');
      setTempProfileUser(res.user);
      setShowProfileModal(true);
      setSuccessMessage('Google Authentication successful! Complete your traveler profile.');
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setErrorMessage(err.message || 'Google sign-in could not be completed. Please try again or use email sign-in.');
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // Save updated profile from modal
  const handleSaveProfileDetails = (updatedProfile) => {
    updateUserDetails(updatedProfile);
    setSuccessMessage(`Profile updated as ${updatedProfile.name}!`);
    setTimeout(() => {
      navigate('/portal/user');
    }, 600);
  };

  // Handle Password Reset Request
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (!resetEmail) {
      setResetStatus('Please enter your registered account email address.');
      return;
    }
    setResetSubmitting(true);
    setResetStatus('');

    try {
      await resetPassword(resetEmail);
      setResetStatus('Password reset instructions have been dispatched to your email.');
    } catch (err) {
      setResetStatus(err.message || 'Could not dispatch password reset link. Please verify the email address.');
    } finally {
      setResetSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070B19] text-slate-900 dark:text-white flex items-center justify-center p-4 sm:p-6 relative overflow-hidden py-14 w-full">
      
      {/* Background Mountain Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[450px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[350px] bg-orange-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative max-w-lg w-full bg-white dark:bg-[#0D1528]/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-amber-500/30 shadow-2xl animate-in fade-in zoom-in-95 my-4">
        
        {/* Brand Header */}
        <div className="text-center mb-6 flex flex-col items-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-3 hover:opacity-90 transition">
            <SwargBhramanLogo size="md" />
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-[11px] font-bold uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5 text-amber-500" />
            <span>Traveler Pass &amp; Explorer Hub</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 dark:text-white">
            {activeTab === 'signin' ? 'Welcome Back, Explorer' : 'Create Traveler Account'}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 max-w-md">
            {activeTab === 'signin'
              ? 'Sign in to access your booked Himalayan expeditions, digital QR passes, and personalized itineraries.'
              : 'Join the Devbhoomi traveler community to save custom mountain routes and unlock verified pilgrimage passes.'}
          </p>
        </div>

        {/* Success Alert Banner */}
        {successMessage && (
          <div className="mb-5 p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-800 dark:text-amber-300 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
            <span className="font-semibold">{successMessage}</span>
          </div>
        )}

        {/* Error Alert Banner */}
        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-700 dark:text-rose-300 text-xs flex items-start justify-between gap-2 animate-in fade-in">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage('')}
              className="text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white text-xs px-1"
            >
              ✕
            </button>
          </div>
        )}

        {/* Active Session Card (If Logged In) */}
        {isLoggedIn && currentUser && (
          <div className="mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-[#090F1E] border border-slate-200 dark:border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-11 h-11 rounded-xl object-cover border border-amber-400/50"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white font-serif">{currentUser.name}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/40">
                      {currentUser.role === 'admin' ? 'Master Admin' : currentUser.role === 'guide' ? 'Mountain Guide' : currentUser.role === 'shop' ? 'Shop Owner' : currentUser.role === 'vendor' ? 'Artisan' : 'Traveler'}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono block">{currentUser.email}</span>
                  {currentUser.badge && (
                    <span className="text-[10px] text-amber-500 dark:text-amber-400 font-medium">🏅 {currentUser.badge}</span>
                  )}
                </div>
              </div>

              {/* Native Mobile App Style Logout Button */}
              <button
                type="button"
                onClick={openLogoutModal}
                className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 dark:bg-rose-500/20 dark:hover:bg-rose-500/30 text-rose-600 dark:text-rose-300 rounded-lg text-xs font-semibold transition flex items-center gap-1 cursor-pointer"
              >
                <LogOut className="w-3 h-3" />
                <span>Logout</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200 dark:border-white/10">
              <button
                type="button"
                onClick={() => {
                  setTempProfileUser(currentUser);
                  setShowProfileModal(true);
                }}
                className="flex-1 py-1.5 px-2 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-800 dark:text-amber-300 border border-amber-500/30 text-[11px] font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/portal/user')}
                className="flex-1 py-1.5 px-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-[11px] font-bold text-center transition cursor-pointer"
              >
                🧭 Explorer Hub
              </button>

              <Link
                to="/my-trips"
                className="flex-1 py-1.5 px-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-[11px] font-bold text-center transition cursor-pointer flex items-center justify-center gap-1"
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>My QR Passes</span>
              </Link>
            </div>
          </div>
        )}

        {/* 1. One-Click Google Authentication for Travelers */}
        <div className="space-y-3 mb-5">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
            className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-50 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-white border border-slate-300 dark:border-white/20 font-bold text-xs sm:text-sm flex items-center justify-center gap-3 transition shadow-sm hover:shadow active:scale-[0.99] cursor-pointer disabled:opacity-50"
          >
            {isGoogleLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
            ) : (
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            )}
            <span>
              {isGoogleLoading ? 'Connecting to Google...' : 'Continue with Google'}
            </span>
          </button>

          {/* Clean Divider */}
          <div className="flex items-center gap-3 pt-1">
            <div className="flex-1 h-px bg-slate-200 dark:bg-white/10" />
            <span className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
              Or continue with email
            </span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-white/10" />
          </div>
        </div>

        {/* Tab Switcher: Sign In vs Sign Up */}
        <div className="flex bg-slate-100 dark:bg-black/50 p-1 rounded-2xl border border-slate-200 dark:border-white/10 mb-5">
          <button
            type="button"
            onClick={() => {
              setActiveTab('signin');
              setErrorMessage('');
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'signin'
                ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 shadow-md font-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            Sign In
          </button>
          
          <button
            type="button"
            onClick={() => {
              setActiveTab('signup');
              setErrorMessage('');
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'signup'
                ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 shadow-md font-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Traveler Email & Password Form */}
        <form onSubmit={handleAuthSubmit} className="space-y-3.5 text-xs">
          
          {/* Full Name (Only on Signup) */}
          {activeTab === 'signup' && (
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
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
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-black/40 border border-slate-300 dark:border-white/15 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Phone & City (Only on Signup) */}
          {activeTab === 'signup' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  WhatsApp / Phone
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 95287 31865"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-black/40 border border-slate-300 dark:border-white/15 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Home City / State
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dehradun / Delhi"
                    value={homeCity}
                    onChange={(e) => setHomeCity(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-black/40 border border-slate-300 dark:border-white/15 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Email Address */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Traveler Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                placeholder="e.g. explorer@swargbraman.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-black/40 border border-slate-300 dark:border-white/15 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Enter password (minimum 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-black/40 border border-slate-300 dark:border-white/15 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded bg-slate-100 dark:bg-black/40 border-slate-300 dark:border-white/20 text-amber-500 focus:ring-0" />
              <span>Remember me on this device</span>
            </label>
            <button
              type="button"
              onClick={() => {
                setShowResetModal(!showResetModal);
                setResetEmail(email);
              }}
              className="text-amber-600 dark:text-amber-400 hover:underline cursor-pointer font-bold"
            >
              Forgot password?
            </button>
          </div>

          {/* Inline Forgot Password Box */}
          {showResetModal && (
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-amber-300 dark:border-amber-500/30 space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between text-xs text-amber-800 dark:text-amber-300 font-bold">
                <span className="flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Password Reset Email:</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowResetModal(false)}
                  className="text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter registered account email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="flex-1 px-3 py-2 bg-white dark:bg-black/50 border border-slate-300 dark:border-white/15 rounded-xl text-slate-900 dark:text-white text-xs placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-400 font-mono"
                />
                <button
                  type="button"
                  onClick={handlePasswordReset}
                  disabled={resetSubmitting}
                  className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs transition disabled:opacity-50 cursor-pointer"
                >
                  {resetSubmitting ? 'Sending...' : 'Send'}
                </button>
              </div>

              {resetStatus && (
                <p className="text-[11px] text-amber-700 dark:text-amber-200 mt-1">{resetStatus}</p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-2xl font-black text-sm shadow-xl transition flex items-center justify-center gap-2 mt-4 disabled:opacity-50 cursor-pointer bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 shadow-amber-950/40"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
            <span>
              {activeTab === 'signin' ? 'Sign In to Traveler Account' : 'Create Traveler Account'}
            </span>
          </button>
        </form>

        {/* Dedicated Partner / Admin Access Footnote */}
        <div className="mt-8 pt-5 border-t border-slate-200 dark:border-white/10 space-y-3">
          <div className="p-3 rounded-2xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <span className="text-slate-600 dark:text-slate-400 text-center sm:text-left">
              Are you a Mountain Guide, Native Artisan, or Local Shop Owner?
            </span>
            <Link
              to="/provider/login"
              className="text-amber-600 dark:text-amber-400 hover:underline font-bold whitespace-nowrap flex items-center gap-1"
            >
              <span>Provider Portal Login</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2 px-1">
            <Link to="/" className="text-amber-500 dark:text-amber-300 font-bold hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Explorer Home</span>
            </Link>
            
            <Link
              to="/admin/login"
              className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition text-[11px]"
            >
              Administrator Login
            </Link>
          </div>
        </div>

      </div>

      {/* Complete Profile Popup Modal */}
      <CompleteProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        initialUser={tempProfileUser || currentUser}
        onSaveProfile={handleSaveProfileDetails}
      />

    </div>
  );
}
