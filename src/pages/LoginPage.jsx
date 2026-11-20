import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Lock, Mail, User, ShieldCheck, Store, Compass, 
  ArrowRight, Sparkles, CheckCircle2, Eye, EyeOff, KeyRound 
} from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [activeTab, setActiveTab] = useState('signin'); // 'signin' | 'signup'
  const [selectedRole, setSelectedRole] = useState('traveler'); // 'traveler' | 'vendor' | 'admin'
  const [showPassword, setShowPassword] = useState(false);

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [studioName, setStudioName] = useState('');

  // Handle Submit
  const handleAuthSubmit = (e) => {
    e.preventDefault();

    let userRole = selectedRole;
    let userName = fullName || (selectedRole === 'vendor' ? 'Meenakshi Joshi' : selectedRole === 'admin' ? 'Devbhoomi Trust Admin' : 'Priyanshu Singh Mahar');
    let userEmail = email || `${selectedRole}@pahadivibe.in`;

    const userObj = {
      id: `usr-${Date.now()}`,
      name: userName,
      email: userEmail,
      role: userRole,
      avatar: selectedRole === 'vendor' 
        ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      badge: selectedRole === 'vendor' ? 'Master Artisan Partner' : selectedRole === 'admin' ? 'State Administrator' : 'Verified Himalayan Explorer'
    };

    login(userObj);

    // Redirect to relevant page
    if (userRole === 'vendor') {
      navigate('/portal/vendor');
    } else if (userRole === 'admin') {
      navigate('/portal/admin');
    } else {
      navigate('/portal/user');
    }
  };

  // Quick Demo Logins
  const handleDemoLogin = (role) => {
    let demoUser;
    if (role === 'traveler') {
      demoUser = {
        id: 'usr-traveler-1',
        name: 'Priyanshu Singh Mahar',
        email: 'priyanshu@pahadivibe.in',
        role: 'traveler',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        badge: 'Verified Himalayan Explorer'
      };
      login(demoUser);
      navigate('/portal/user');
    } else if (role === 'vendor') {
      demoUser = {
        id: 'usr-vendor-1',
        name: 'Meenakshi Joshi',
        email: 'meenakshi@aipanart.in',
        role: 'vendor',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        badge: 'Verified Master Aipan Artist'
      };
      login(demoUser);
      navigate('/portal/vendor');
    } else if (role === 'admin') {
      demoUser = {
        id: 'usr-admin-1',
        name: 'State Trust Administrator',
        email: 'admin@pahadivibe.in',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        badge: 'State Trust Super Admin'
      };
      login(demoUser);
      navigate('/portal/admin');
    }
  };

  return (
    <div className="min-h-screen bg-[#070E0D] text-white flex items-center justify-center p-4 sm:p-6 relative overflow-hidden py-16">
      
      {/* Background Mountain Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-xl w-full bg-[#0E201D]/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border border-emerald-500/30 shadow-2xl animate-in fade-in zoom-in-95">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-3">
            <span className="text-3xl">🏔️</span>
            <span className="text-2xl font-black font-serif text-white">
              Pahadi<span className="text-emerald-400">Vibe</span>
            </span>
          </Link>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
            {activeTab === 'signin' ? 'Welcome Back to Devbhoomi' : 'Join the Mountain Community'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Sign in to access your booked trips, manage artisan studios, or oversee platform operations.
          </p>
        </div>

        {/* Role Selector Buttons */}
        <div className="mb-6">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 text-center">
            Select Your Account Portal Type:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'traveler', label: 'Traveler', icon: '🎒', color: 'border-emerald-500 text-emerald-300' },
              { id: 'vendor', label: 'Artisan / Host', icon: '🎨', color: 'border-rose-500 text-rose-300' },
              { id: 'admin', label: 'State Admin', icon: '🛡️', color: 'border-indigo-500 text-indigo-300' },
            ].map(r => (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedRole(r.id)}
                className={`p-3 rounded-2xl border text-center transition ${
                  selectedRole === r.id
                    ? `bg-black/60 ${r.color} font-bold shadow-lg scale-102`
                    : 'bg-black/20 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-xl mb-1">{r.icon}</div>
                <div className="text-xs">{r.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Switcher: Sign In vs Sign Up */}
        <div className="flex bg-black/40 p-1 rounded-2xl border border-white/10 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('signin')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'signin'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In to Account
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'signup'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Register New Account
          </button>
        </div>

        {/* Fast 1-Click Demo Buttons */}
        <div className="mb-6 p-3.5 bg-black/40 rounded-2xl border border-emerald-500/20">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              1-Click Instant Demo Login:
            </span>
            <span className="text-[10px] text-slate-400">No password needed</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('traveler')}
              className="py-1.5 px-2 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/30 text-emerald-300 rounded-xl text-[11px] font-bold transition"
            >
              🎒 As Traveler
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('vendor')}
              className="py-1.5 px-2 bg-rose-950/80 hover:bg-rose-900 border border-rose-500/30 text-rose-300 rounded-xl text-[11px] font-bold transition"
            >
              🎨 As Artisan
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('admin')}
              className="py-1.5 px-2 bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-500/30 text-indigo-300 rounded-xl text-[11px] font-bold transition"
            >
              🛡️ As Admin
            </button>
          </div>
        </div>

        {/* Form */}
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
                  className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/15 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
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
                  required
                  placeholder="e.g. Aipan Heritage Art Studio, Almora"
                  value={studioName}
                  onChange={(e) => setStudioName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/15 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
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
                placeholder={selectedRole === 'vendor' ? 'artisan@pahadivibe.in' : 'traveler@pahadivibe.in'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/15 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
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
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-black/40 border border-white/15 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
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
              <input type="checkbox" defaultChecked className="rounded text-emerald-500 focus:ring-emerald-400" />
              <span>Remember me on this device</span>
            </label>
            <span className="text-emerald-400 hover:underline cursor-pointer">Forgot password?</span>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl font-bold text-sm shadow-xl transition flex items-center justify-center gap-2 mt-4"
          >
            <span>{activeTab === 'signin' ? 'Sign In & Launch Portal' : 'Complete Registration'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-white/10 text-center text-xs text-slate-400">
          <span>Explore without signing in? </span>
          <Link to="/" className="text-amber-300 font-bold hover:underline">
            Return to Home Explorer
          </Link>
        </div>

      </div>
    </div>
  );
}
