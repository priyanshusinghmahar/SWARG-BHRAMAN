import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  X, Lock, LogIn, Sparkles, Ticket, ShoppingBag, 
  ArrowRight, ShieldCheck, AlertCircle, CheckCircle2, User, KeyRound 
} from 'lucide-react';

export default function LoginRequiredModal({
  isOpen,
  onClose,
  pendingAction = null, // { type: 'booking' | 'purchase', data: any }
  onLoginSuccess
}) {
  const { loginWithGoogle, loginWithEmail, signupWithEmail, authError, setAuthError } = useAuth();
  const { isDark } = useTheme();

  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState('');

  if (!isOpen) return null;

  const isBooking = pendingAction?.type === 'booking';
  const isPurchase = pendingAction?.type === 'purchase';

  // Target item details for contextual awareness
  const targetTitle = pendingAction?.data?.title || 
                      pendingAction?.data?.name || 
                      pendingAction?.data?.packageTitle || 
                      (isBooking ? 'Himalayan Expedition / Yatra' : 'Handicraft & Local Product');

  const targetPrice = pendingAction?.data?.pricePerPerson || 
                      pendingAction?.data?.startingPrice || 
                      pendingAction?.data?.price || 
                      pendingAction?.data?.totalPrice;

  // Handle Google 1-Click Sign In
  const handleGoogleAuth = async () => {
    try {
      setSubmitting(true);
      setLocalError('');
      setAuthError('');
      const user = await loginWithGoogle();
      setSubmitting(false);
      if (user) {
        onLoginSuccess?.(user);
      }
    } catch (err) {
      setSubmitting(false);
      setLocalError(err.message || 'Google sign-in could not be completed.');
    }
  };

  // Handle Email / Password Sign In or Quick Register
  const handleEmailAuth = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setLocalError('Please enter your email and password.');
      return;
    }

    try {
      setSubmitting(true);
      setLocalError('');
      setAuthError('');

      if (activeTab === 'login') {
        const user = await loginWithEmail(email, password);
        setSubmitting(false);
        if (user) {
          onLoginSuccess?.(user);
        }
      } else {
        if (!fullName) {
          setLocalError('Please enter your full name.');
          setSubmitting(false);
          return;
        }
        const user = await signupWithEmail(email, password, {
          fullName,
          phone,
          role: 'traveler'
        });
        setSubmitting(false);
        if (user) {
          onLoginSuccess?.(user);
        }
      }
    } catch (err) {
      setSubmitting(false);
      setLocalError(err.message || 'Authentication failed. Please verify credentials.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className={`relative w-full max-w-md my-8 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-5 border-2 text-left transition-all ${
        isDark 
          ? 'bg-gradient-to-b from-[#0F172A] via-[#0E1627] to-[#0A101E] border-amber-500/40 text-white shadow-black/90' 
          : 'bg-white border-amber-500/30 text-slate-900 shadow-slate-400/30'
      }`}>

        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close"
          className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition cursor-pointer border ${
            isDark 
              ? 'bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white border-white/10' 
              : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border-slate-200'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Badge & Title */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
            {isBooking ? <Ticket className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
            <span>Please Login First</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight text-slate-950 dark:text-white">
            {isBooking ? 'Login to Book Your Trip' : 'Login to Complete Purchase'}
          </h3>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {isBooking
              ? 'Please sign in to confirm your booking, generate verified QR passes, and receive SMS/email itinerary updates.'
              : 'Please sign in to order authentic handcrafted items directly from certified Uttarakhand artisans.'}
          </p>
        </div>

        {/* Target Item Summary Card (Context Retention) */}
        {targetTitle && (
          <div className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 text-xs ${
            isDark 
              ? 'bg-white/[0.04] border-white/10 text-slate-200' 
              : 'bg-amber-50/80 border-amber-200 text-slate-800'
          }`}>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400">
                {isBooking ? 'Pending Expedition' : 'Selected Item'}
              </div>
              <div className="font-bold truncate text-slate-950 dark:text-white">{targetTitle}</div>
            </div>
            {targetPrice && (
              <div className="text-right flex-shrink-0">
                <div className="text-[10px] text-slate-500 dark:text-slate-400">Amount</div>
                <div className="font-extrabold font-serif text-amber-700 dark:text-amber-300">
                  ₹{Number(targetPrice).toLocaleString('en-IN')}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Error Alert Box */}
        {(localError || authError) && (
          <div className="p-3 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-800 dark:text-rose-200 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
            <span className="leading-snug">{localError || authError}</span>
          </div>
        )}

        {/* Google 1-Click Fast Auth Button */}
        <button
          type="button"
          onClick={handleGoogleAuth}
          disabled={submitting}
          className={`w-full py-3 px-4 rounded-2xl border font-bold text-xs flex items-center justify-center gap-3 transition cursor-pointer shadow-md ${
            isDark
              ? 'bg-white hover:bg-slate-100 text-slate-950 border-white'
              : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300'
          }`}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className={`w-full border-t ${isDark ? 'border-white/10' : 'border-slate-200'}`} />
          <span className={`px-2.5 text-[10px] uppercase tracking-wider font-bold absolute ${
            isDark ? 'bg-[#0E1627] text-slate-400' : 'bg-white text-slate-500'
          }`}>
            Or with Email
          </span>
        </div>

        {/* Tab Switcher: Sign In vs Register */}
        <div className={`grid grid-cols-2 p-1 rounded-2xl border text-xs font-bold ${
          isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'
        }`}>
          <button
            type="button"
            onClick={() => { setActiveTab('login'); setLocalError(''); }}
            className={`py-1.5 rounded-xl transition ${
              activeTab === 'login'
                ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm'
                : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-950')
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('register'); setLocalError(''); }}
            className={`py-1.5 rounded-xl transition ${
              activeTab === 'register'
                ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm'
                : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-950')
            }`}
          >
            Register
          </button>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleEmailAuth} className="space-y-3">
          {activeTab === 'register' && (
            <>
              <div>
                <label className={`block text-[11px] font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs border outline-none transition ${
                      isDark 
                        ? 'bg-white/5 border-white/10 text-white focus:border-amber-400' 
                        : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500'
                    }`}
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className={`block text-[11px] font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. yourname@gmail.com"
              className={`w-full px-3 py-2 rounded-xl text-xs border outline-none transition ${
                isDark 
                  ? 'bg-white/5 border-white/10 text-white focus:border-amber-400' 
                  : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500'
              }`}
            />
          </div>

          <div>
            <label className={`block text-[11px] font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Password
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs border outline-none transition ${
                  isDark 
                    ? 'bg-white/5 border-white/10 text-white focus:border-amber-400' 
                    : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500'
                }`}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold text-xs transition flex items-center justify-center gap-1.5 shadow-lg shadow-amber-950/30 cursor-pointer"
          >
            {submitting ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>{activeTab === 'login' ? 'Sign In & Continue' : 'Create Account & Continue'}</span>
              </>
            )}
          </button>
        </form>

        {/* Security Trust Footnote */}
        <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex items-center justify-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>256-Bit SSL Encrypted • SwargBhraman Devbhoomi Trust Guarantee</span>
        </div>

      </div>
    </div>
  );
}