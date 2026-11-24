import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import SwargBhramanLogo from '../components/SwargBhramanLogo';
import CompleteProfileModal from '../components/CompleteProfileModal';
import { useAuth } from '../context/AuthContext';
import { 
  Lock, Mail, User, ShieldCheck, Compass, 
  ArrowRight, CheckCircle2, Eye, EyeOff, 
  AlertCircle, Loader2, LogOut,
  Shield, Send, Phone, MapPin, Edit3, Ticket, Heart,
  Mountain, Palette, Store, Award, ArrowLeft
} from 'lucide-react';

export default function ProviderLoginPage() {
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

  // Parse any query param role (e.g. /provider/login?role=guide&tab=signup)
  const queryParams = new URLSearchParams(location.search);
  const initialRoleParam = queryParams.get('role');
  const initialTabParam = queryParams.get('tab');

  const [activeTab, setActiveTab] = useState(() => (initialTabParam === 'signup' ? 'signup' : 'signin'));
  const [selectedRole, setSelectedRole] = useState(() => {
    if (initialRoleParam === 'guide') return 'guide';
    if (initialRoleParam === 'shop') return 'shop';
    return 'artisan';
  });

  // Sync role if query param changes
  React.useEffect(() => {
    if (initialRoleParam === 'guide') setSelectedRole('guide');
    if (initialRoleParam === 'shop') setSelectedRole('shop');
    if (initialRoleParam === 'artisan' || initialRoleParam === 'vendor') setSelectedRole('artisan');
  }, [initialRoleParam]);

  React.useEffect(() => {
    if (initialTabParam === 'signup') setActiveTab('signup');
    else if (initialTabParam === 'signin') setActiveTab('signin');
  }, [initialTabParam]);

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

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  // Guide specific registration fields
  const [guideBase, setGuideBase] = useState('Joshimath / Chamoli');
  const [guideCert, setGuideCert] = useState('IMF Certified Mountain Leader (NIM Uttarkashi)');
  const [dailyRate, setDailyRate] = useState('2800');

  // Artisan specific registration fields
  const [craftCategory, setCraftCategory] = useState('Kumaoni Aipan Folk Art');
  const [workshopTown, setWorkshopTown] = useState('Almora Bazaar');

  // Local Shop specific registration fields
  const [shopName, setShopName] = useState('');
  const [shopCategory, setShopCategory] = useState('Wild Forest Honey & Pahadi Herbs');
  const [shopTown, setShopTown] = useState('Ranikhet Sadar Bazaar');

  // Smart portal redirect based on provider role
  const navigateByRole = (role) => {
    if (role === 'guide') {
      navigate('/portal/provider?role=guide');
    } else if (role === 'shop') {
      navigate('/portal/provider?role=shop');
    } else {
      navigate('/portal/provider?role=artisan');
    }
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setEmail('');
    setPassword('');
    setErrorMessage('');
    setSuccessMessage('');
  };

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
          navigateByRole(selectedRole);
        }, 500);
      } else {
        const extraData = {
          phone,
          homeCity: selectedRole === 'guide' ? guideBase : selectedRole === 'shop' ? shopTown : workshopTown,
          travelPreference: selectedRole === 'guide' ? guideCert : selectedRole === 'shop' ? shopCategory : craftCategory,
          emergencyContact: '',
          specialty: selectedRole === 'guide' ? guideCert : selectedRole === 'shop' ? `${shopName} • ${shopCategory}` : craftCategory
        };

        const resolvedName = fullName || (
          selectedRole === 'guide' 
            ? 'Certified Himalayan Guide' 
            : selectedRole === 'shop'
            ? (shopName || 'Local Shop Owner')
            : 'Native Pahadi Artisan'
        );

        const res = await signupWithEmail(
          email, 
          password, 
          resolvedName,
          selectedRole,
          extraData
        );

        const roleLabel = selectedRole === 'guide' ? 'Mountain Guide' : selectedRole === 'shop' ? 'Local Shop Owner' : 'Native Artisan';
        setSuccessMessage(`${roleLabel} account registered! Welcome, ${res.user.name}.`);
        setTimeout(() => {
          navigateByRole(selectedRole);
        }, 600);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    setIsGoogleLoading(true);

    try {
      const res = await loginWithGoogle(selectedRole);
      setTempProfileUser(res.user);
      setShowProfileModal(true);
      setSuccessMessage('Google Authentication successful! Complete your provider profile.');
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setErrorMessage(err.message || 'Google sign-in could not be completed. Please try again or use email sign-in.');
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleSaveProfileDetails = (updatedProfile) => {
    updateUserDetails(updatedProfile);
    setSuccessMessage(`Profile updated as ${updatedProfile.name}!`);
    setTimeout(() => {
      navigateByRole(updatedProfile.role || selectedRole);
    }, 600);
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (!resetEmail) {
      setResetStatus('Please enter your registered provider email.');
      return;
    }
    setResetSubmitting(true);
    setResetStatus('');

    try {
      await resetPassword(resetEmail);
      setResetStatus('Password reset instructions have been dispatched to your email.');
    } catch (err) {
      setResetStatus(err.message || 'Could not dispatch password reset link. Please check the email.');
    } finally {
      setResetSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070B19] text-slate-900 dark:text-white flex items-center justify-center p-4 sm:p-6 relative overflow-hidden py-14 w-full">
      
      {/* Background Mountain Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[450px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[350px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative max-w-xl w-full bg-white dark:bg-[#0D1528]/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-emerald-500/30 shadow-2xl animate-in fade-in zoom-in-95 my-4">
        
        {/* Brand Header */}
        <div className="text-center mb-6 flex flex-col items-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-3 hover:opacity-90 transition">
            <SwargBhramanLogo size="md" />
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Devbhoomi Partner &amp; Provider Portal</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 dark:text-white">
            {activeTab === 'signin' 
              ? (selectedRole === 'guide' ? 'Mountain Guide Sign In' : selectedRole === 'shop' ? 'Local Shop Owner Sign In' : 'Native Artisan Sign In')
              : (selectedRole === 'guide' ? 'Register as Mountain Guide' : selectedRole === 'shop' ? 'Register Local Mountain Shop' : 'Register as Native Artisan')}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-md">
            {selectedRole === 'guide'
              ? 'Lead certified expeditions, manage guiding fee payouts, and verify biometric passes with 0% platform fee.'
              : selectedRole === 'shop'
              ? 'List pure forest honey, Badri cow ghee, and organic Pahadi provisions directly to travelers.'
              : 'Showcase authentic Aipan art, Tamta copperware, and Bhotia handlooms directly to pilgrims with 100% direct payouts.'}
          </p>
        </div>

        {/* Success Alert Banner */}
        {successMessage && (
          <div className="mb-5 p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
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

        {/* 3 Provider Role Tabs: Guide, Artisan, Local Shop */}
        <div className="mb-5">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-emerald-300/80 mb-2">
            Select Your Provider Category:
          </label>
          <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-black/50 border border-slate-200 dark:border-white/10">
            
            {/* 1. Mountain Guide */}
            <button
              type="button"
              onClick={() => handleRoleSelect('guide')}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition flex flex-col sm:flex-row items-center justify-center gap-1.5 cursor-pointer ${
                selectedRole === 'guide'
                  ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-slate-950 shadow-md font-black'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Mountain className="w-4 h-4" />
              <span>🧭 Guide</span>
            </button>

            {/* 2. Native Artisan */}
            <button
              type="button"
              onClick={() => handleRoleSelect('artisan')}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition flex flex-col sm:flex-row items-center justify-center gap-1.5 cursor-pointer ${
                selectedRole === 'artisan' || selectedRole === 'vendor'
                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 shadow-md font-black'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>🎨 Artisan</span>
            </button>

            {/* 3. Local Shop Owner */}
            <button
              type="button"
              onClick={() => handleRoleSelect('shop')}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition flex flex-col sm:flex-row items-center justify-center gap-1.5 cursor-pointer ${
                selectedRole === 'shop'
                  ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-slate-950 shadow-md font-black'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>🏪 Local Shop</span>
            </button>
          </div>
        </div>

        {/* Google Authentication for Providers */}
        <div className="space-y-3 mb-5">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
            className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-50 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-white border border-slate-300 dark:border-white/20 font-bold text-xs sm:text-sm flex items-center justify-center gap-3 transition shadow-sm hover:shadow active:scale-[0.99] cursor-pointer disabled:opacity-50"
          >
            {isGoogleLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
            ) : (
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            )}
            <span>
              {isGoogleLoading
                ? 'Connecting to Google...'
                : `Continue with Google as ${
                    selectedRole === 'guide'
                      ? 'Mountain Guide'
                      : selectedRole === 'shop'
                      ? 'Local Shop Owner'
                      : 'Native Artisan'
                  }`}
            </span>
          </button>

          {/* Clean Divider */}
          <div className="flex items-center gap-3 pt-1">
            <div className="flex-1 h-px bg-slate-200 dark:bg-white/10" />
            <span className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
              Or continue with provider email
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
                ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-slate-950 shadow-md font-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            Provider Sign In
          </button>
          
          <button
            type="button"
            onClick={() => {
              setActiveTab('signup');
              setErrorMessage('');
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'signup'
                ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-slate-950 shadow-md font-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            Register as Partner
          </button>
        </div>

        {/* Provider Email & Password Form */}
        <form onSubmit={handleAuthSubmit} className="space-y-3.5 text-xs">
          
          {/* Full Name / Studio Name */}
          {activeTab === 'signup' && (
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {selectedRole === 'guide' 
                  ? 'Guide Full Name / Trek Leader Name' 
                  : selectedRole === 'shop'
                  ? 'Shop Owner Full Name'
                  : 'Master Artisan / Studio Name'}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder={
                    selectedRole === 'guide' 
                      ? 'e.g. Arjun Singh Negi' 
                      : selectedRole === 'shop'
                      ? 'e.g. Ramesh Chandra Joshi'
                      : 'e.g. Meenakshi Joshi Aipan Works'
                  }
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-black/40 border border-slate-300 dark:border-white/15 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Guide Specific Registration Fields */}
          {activeTab === 'signup' && selectedRole === 'guide' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
              <div>
                <label className="block font-semibold text-emerald-800 dark:text-emerald-300 mb-1">Mountain Base / Valley</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-emerald-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Joshimath / Chamoli"
                    value={guideBase}
                    onChange={(e) => setGuideBase(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-black/50 border border-slate-300 dark:border-emerald-500/30 rounded-xl text-slate-900 dark:text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-emerald-800 dark:text-emerald-300 mb-1">Certification / Badge</label>
                <div className="relative">
                  <Award className="w-4 h-4 text-emerald-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. IMF Certified / NIM Uttarkashi"
                    value={guideCert}
                    onChange={(e) => setGuideCert(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-black/50 border border-slate-300 dark:border-emerald-500/30 rounded-xl text-slate-900 dark:text-white text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Artisan Specific Registration Fields */}
          {activeTab === 'signup' && (selectedRole === 'artisan' || selectedRole === 'vendor') && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30">
              <div>
                <label className="block font-semibold text-amber-800 dark:text-amber-300 mb-1">Pahadi Craft Specialization</label>
                <select
                  value={craftCategory}
                  onChange={(e) => setCraftCategory(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white dark:bg-black/50 border border-slate-300 dark:border-amber-500/30 rounded-xl text-slate-900 dark:text-white text-xs"
                >
                  <option value="Kumaoni Aipan Folk Art">Kumaoni Aipan Folk Art</option>
                  <option value="Almora Tamta Copperware">Almora Tamta Copperware</option>
                  <option value="Bhotia Woolen Handloom">Bhotia Woolen Handloom (Thulma / Chutka)</option>
                  <option value="Garhwali Wood Carving">Garhwali Wood Carving</option>
                  <option value="Ringal Bamboo Crafts">Ringal Bamboo Crafts</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-amber-800 dark:text-amber-300 mb-1">Workshop Town / Village</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-amber-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Almora Bazaar / Pithoragarh"
                    value={workshopTown}
                    onChange={(e) => setWorkshopTown(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-black/50 border border-slate-300 dark:border-amber-500/30 rounded-xl text-slate-900 dark:text-white text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Local Shop Specific Registration Fields */}
          {activeTab === 'signup' && selectedRole === 'shop' && (
            <div className="space-y-3 p-3 rounded-2xl bg-teal-500/10 border border-teal-500/30">
              <div>
                <label className="block font-semibold text-teal-800 dark:text-teal-300 mb-1">Shop / Mountain Haat Name</label>
                <div className="relative">
                  <Store className="w-4 h-4 text-teal-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ranikhet Organic Produce & Mountain Haat"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-black/50 border border-slate-300 dark:border-teal-500/30 rounded-xl text-slate-900 dark:text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-teal-800 dark:text-teal-300 mb-1">Shop Category</label>
                  <select
                    value={shopCategory}
                    onChange={(e) => setShopCategory(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white dark:bg-black/50 border border-slate-300 dark:border-teal-500/30 rounded-xl text-slate-900 dark:text-white text-xs"
                  >
                    <option value="Wild Forest Honey & Pahadi Herbs">Wild Forest Honey & Pahadi Herbs</option>
                    <option value="Badri Cow A2 Dairy & Pure Ghee">Badri Cow A2 Dairy & Pure Ghee</option>
                    <option value="Sacred Temple Pooja & Havan Samagri">Sacred Temple Pooja & Havan Samagri</option>
                    <option value="Organic Pahadi Dal, Mandua & Spices">Organic Pahadi Dal, Mandua & Spices</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-teal-800 dark:text-teal-300 mb-1">Market Location</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-teal-500 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sadar Bazar, Ranikhet"
                      value={shopTown}
                      onChange={(e) => setShopTown(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-black/50 border border-slate-300 dark:border-teal-500/30 rounded-xl text-slate-900 dark:text-white text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* WhatsApp / Phone (in Signup) */}
          {activeTab === 'signup' && (
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                WhatsApp / Provider Contact Phone
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="tel"
                  required
                  placeholder="+91 94120 77812"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-black/40 border border-slate-300 dark:border-white/15 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 font-mono"
                />
              </div>
            </div>
          )}

          {/* Email Address */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Registered Provider Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                placeholder="e.g. provider@swargbraman.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-black/40 border border-slate-300 dark:border-white/15 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Enter password (minimum 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-black/40 border border-slate-300 dark:border-white/15 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
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
              <input type="checkbox" defaultChecked className="rounded bg-slate-100 dark:bg-black/40 border-slate-300 dark:border-white/20 text-emerald-500 focus:ring-0" />
              <span>Remember me on this device</span>
            </label>
            <button
              type="button"
              onClick={() => {
                setShowResetModal(!showResetModal);
                setResetEmail(email);
              }}
              className="text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer font-bold"
            >
              Forgot password?
            </button>
          </div>

          {/* Inline Forgot Password Box */}
          {showResetModal && (
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-emerald-300 dark:border-emerald-500/30 space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300 font-bold">
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
                  placeholder="Enter registered provider email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="flex-1 px-3 py-2 bg-white dark:bg-black/50 border border-slate-300 dark:border-white/15 rounded-xl text-slate-900 dark:text-white text-xs placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 font-mono"
                />
                <button
                  type="button"
                  onClick={handlePasswordReset}
                  disabled={resetSubmitting}
                  className="px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl text-xs transition disabled:opacity-50 cursor-pointer"
                >
                  {resetSubmitting ? 'Sending...' : 'Send'}
                </button>
              </div>

              {resetStatus && (
                <p className="text-[11px] text-emerald-700 dark:text-emerald-200 mt-1">{resetStatus}</p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-2xl font-black text-sm shadow-xl transition flex items-center justify-center gap-2 mt-4 disabled:opacity-50 cursor-pointer bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-600 text-slate-950 shadow-emerald-950/40"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
            <span>
              {activeTab === 'signin' 
                ? (selectedRole === 'guide' ? 'Sign In to Mountain Guide Desk' : selectedRole === 'shop' ? 'Sign In to Local Shop Portal' : 'Sign In to Artisan Studio')
                : (selectedRole === 'guide' ? 'Register Mountain Guide Account' : selectedRole === 'shop' ? 'Register Mountain Shop Account' : 'Register Native Artisan Account')}
            </span>
          </button>
        </form>

        {/* Return to Explorer Login */}
        <div className="mt-8 pt-5 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <Link to="/login" className="text-amber-500 dark:text-amber-300 font-bold hover:underline flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Go to Traveler Login</span>
          </Link>

          <Link to="/" className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition text-[11px]">
            Return to Explorer Home
          </Link>
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
