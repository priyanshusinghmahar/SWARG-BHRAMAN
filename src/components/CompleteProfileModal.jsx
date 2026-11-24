import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Phone, MapPin, Compass, 
  ShieldCheck, CheckCircle2, ArrowRight, X, Sparkles, Heart, AlertCircle 
} from 'lucide-react';

export default function CompleteProfileModal({ 
  isOpen, 
  onClose, 
  initialUser, 
  onSaveProfile 
}) {
  const [fullName, setFullName] = useState(initialUser?.name || '');
  const [phone, setPhone] = useState(initialUser?.phone || '');
  const [homeCity, setHomeCity] = useState(initialUser?.homeCity || '');
  const [travelPreference, setTravelPreference] = useState(initialUser?.travelPreference || 'Trekking & High Altitude Passes');
  const [emergencyContact, setEmergencyContact] = useState(initialUser?.emergencyContact || '');
  const [dietaryPreference, setDietaryPreference] = useState(initialUser?.dietaryPreference || 'Pure Vegetarian Pahadi Food');
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    if (initialUser) {
      if (initialUser.name) setFullName(initialUser.name);
      if (initialUser.phone) setPhone(initialUser.phone);
      if (initialUser.homeCity) setHomeCity(initialUser.homeCity);
      if (initialUser.travelPreference) setTravelPreference(initialUser.travelPreference);
      if (initialUser.emergencyContact) setEmergencyContact(initialUser.emergencyContact);
    }
  }, [initialUser]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProfile = {
      ...initialUser,
      name: fullName || initialUser?.name || 'Devbhoomi Explorer',
      role: 'traveler',
      badge: 'Verified Himalayan Explorer',
      phone,
      homeCity,
      travelPreference,
      emergencyContact,
      dietaryPreference,
      profileCompleted: true
    };

    onSaveProfile(updatedProfile);
    setStatusMessage('Traveler profile details successfully saved!');
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="relative max-w-xl w-full my-8 bg-[#0E1627] border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-white">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Traveler Explorer Profile</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
            Complete Your Traveler Pass
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md mx-auto">
            Personalize your credentials for instant digital QR boarding passes, emergency mountain safety alerts, and personalized circuit suggestions.
          </p>
        </div>

        {statusMessage && (
          <div className="mb-4 p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Basic Contact Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  className="w-full pl-10 pr-3 py-2.5 bg-black/40 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Email (Authenticated)</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  disabled
                  value={initialUser?.email || 'traveler@swargbraman.in'}
                  className="w-full pl-10 pr-3 py-2.5 bg-black/60 border border-white/10 rounded-xl text-slate-400 font-mono cursor-not-allowed text-xs"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">WhatsApp / Phone Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-black/40 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Home City / State</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Almora, Pithoragarh, Delhi..."
                  value={homeCity}
                  onChange={(e) => setHomeCity(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-black/40 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Travel Preferences */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Himalayan Travel Style</label>
              <select
                value={travelPreference}
                onChange={(e) => setTravelPreference(e.target.value)}
                className="w-full px-3 py-2.5 bg-black/50 border border-white/15 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="Trekking & High Altitude Passes">Trekking & High Altitude Passes</option>
                <option value="Sacred Char Dham & Pilgrim Valleys">Sacred Char Dham & Pilgrim Valleys</option>
                <option value="Heritage & Village Homestays">Heritage & Village Homestays</option>
                <option value="Forest Wildlife Safaris">Jim Corbett & Nature Safaris</option>
                <option value="Alpine Camping & Rafting">Alpine Camping & River Rafting</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Meal & Dietary Preference</label>
              <select
                value={dietaryPreference}
                onChange={(e) => setDietaryPreference(e.target.value)}
                className="w-full px-3 py-2.5 bg-black/50 border border-white/15 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="Pure Vegetarian Pahadi Food">Pure Vegetarian Pahadi Thali</option>
                <option value="Traditional Sattvic (No Onion/Garlic)">Traditional Sattvic (Temple Friendly)</option>
                <option value="Standard Mixed Cuisine">Standard Mixed Cuisine</option>
                <option value="Vegan & Hill Organic">Vegan & Hill Organic</option>
              </select>
            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Mountain Emergency Contact (Required for High Treks & Char Dham)
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-amber-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="e.g. +91 94120 12345 (Father / Trek Companion)"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-black/40 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold transition cursor-pointer"
            >
              Skip for Now
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold rounded-xl transition flex items-center gap-1.5 shadow-lg cursor-pointer"
            >
              <span>Save Traveler Pass</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
