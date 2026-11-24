import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  User, Lock, Mail, ArrowRight, ShieldCheck, Compass, 
  Sparkles, CheckCircle2, AlertCircle, Eye, EyeOff, Loader2, LogOut, Ticket
} from 'lucide-react';

export default function LoginSection({ className = '', onLoginSuccess }) {
  const { 
    currentUser, 
    loginWithEmail, 
    signupWithEmail, 
    loginWithGoogle, 
    loginDemo,
    logout, 
    isLoggedIn 
  } = useAuth();

  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [loginFeedback, setLoginFeedback] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  // Form submission handler with Firebase Auth
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoginFeedback('');
    setIsSubmitting(true);

    try {
      if (authMode === 'signin') {
        const res = await loginWithEmail(email, password, 'traveler');
        setLoginFeedback(`Signed in as ${res.user.name}`);
        if (onLoginSuccess) onLoginSuccess(res.user);
      } else {
        const res = await signupWithEmail(
          email, 
          password, 
          fullName || 'Devbhoomi Explorer', 
          'traveler',
          { phone }
        );
        setLoginFeedback(`Account registered successfully as ${res.user.name}!`);
        if (onLoginSuccess) onLoginSuccess(res.user);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Authentication failed. Please check your credentials or use Quick Explorer Access.');
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
      const res = await loginWithGoogle('traveler');
      setLoginFeedback(`Signed in with Google as ${res.user.name}!`);
      if (onLoginSuccess) onLoginSuccess(res.user);
    } catch (err) {
      setErrorMessage(err.message || 'Google sign-in was interrupted.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // Verified Quick Access for Travelers
  const handleDemoLogin = () => {
    setErrorMessage('');
    const demoUser = {
      id: 'usr-traveler-1',
      name: 'Priyanshu Singh Mahar',
      email: 'priyanshu@swargbraman.in',
      role: 'traveler',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      badge: 'Verified Himalayan Explorer'
    };

    loginDemo(demoUser);
    setLoginFeedback(`Signed in as Verified Explorer: ${demoUser.name}`);
    if (onLoginSuccess) onLoginSuccess(demoUser);
  };

  return (
    <section className={`py-12 bg-[#080D1A] text-white ${className}`}>
      <div className="max-w-xl mx-auto px-4">
        
        <div className="bg-[#0E1627]/95 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          
          <div className="text-center mb-6">
            <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Traveler Pass & Profile</span>
            </span>
            <h3 className="text-2xl font-bold font-serif text-white">
              {isLoggedIn ? `Welcome, ${currentUser?.name}` : 'Sign In as Traveler'}
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Access your digital QR passes, booked Himalayan trips, and personal travel preferences.
            </p>
          </div>

          {loginFeedback && (
            <div className="mb-4 p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{loginFeedback}</span>
            </div>
          )}

          {errorMessage && (
            <div className="mb-4 p-3 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {isLoggedIn && currentUser ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/10">
                <img src={currentUser.avatar} alt={currentUser.name} className="w-12 h-12 rounded-xl object-cover border border-amber-400" />
                <div className="flex-1">
                  <div className="font-bold text-white text-sm">{currentUser.name}</div>
                  <div className="text-xs text-slate-400 font-mono">{currentUser.email}</div>
                  <span className="text-[10px] text-amber-300 font-bold uppercase">{currentUser.badge}</span>
                </div>
                <button onClick={logout} className="p-2 text-rose-400 hover:bg-rose-500/20 rounded-xl transition">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Link to="/portal/user" className="py-2.5 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold text-center transition flex items-center justify-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Traveler Portal</span>
                </Link>
                <Link to="/my-trips" className="py-2.5 px-3 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold text-center transition flex items-center justify-center gap-1.5">
                  <Ticket className="w-3.5 h-3.5" />
                  <span>My QR Passes</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading}
                className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow"
              >
                {isGoogleLoading ? <Loader2 className="w-4 h-4 animate-spin text-amber-400" /> : <Sparkles className="w-4 h-4 text-amber-400" />}
                <span>Continue with Google as Traveler</span>
              </button>

              <div className="flex items-center justify-between p-2.5 bg-black/40 rounded-xl border border-amber-500/20 text-xs">
                <span className="text-slate-300">Quick Explorer Access:</span>
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 rounded-lg font-bold text-[11px] transition shadow"
                >
                  🎒 Verified Explorer Login
                </button>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-3 text-xs">
                {authMode === 'signup' && (
                  <div>
                    <label className="block text-slate-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priyanshu Singh Mahar"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2 bg-black/50 border border-white/15 rounded-xl text-white"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="traveler@swargbraman.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-black/50 border border-white/15 rounded-xl text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-black/50 border border-white/15 rounded-xl text-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold rounded-xl transition shadow"
                >
                  {isSubmitting ? 'Authenticating...' : authMode === 'signin' ? 'Sign In as Traveler' : 'Register Traveler Account'}
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                    className="text-amber-400 hover:underline text-[11px]"
                  >
                    {authMode === 'signin' ? "Don't have an account? Register as Traveler" : 'Already registered? Sign In'}
                  </button>
                </div>
              </form>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
