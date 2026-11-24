import React, { useState } from 'react';
import { handleImageError } from '../utils/imageFallback';
import EmptyState from './EmptyState';
import { 
  Compass, ShieldCheck, Star, Phone, MessageSquare, 
  Award, CheckCircle2, MapPin, Calendar, ArrowRight, 
  Languages, UserPlus, X, Upload 
} from 'lucide-react';

export default function GuidesSection({ guides = [], onBookGuide, onAddNewGuide }) {
  const [filterType, setFilterType] = useState('all');
  const [inquiryGuide, setInquiryGuide] = useState(null);
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({ name: '', phone: '', dates: '', trek: '' });

  // Guide Registration Modal State
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [guideAvatarPreview, setGuideAvatarPreview] = useState('');
  const [guideForm, setGuideForm] = useState({
    name: '',
    title: 'Senior Mountain Trek Leader',
    base: 'Joshimath, Chamoli',
    experienceYears: 5,
    dailyRate: 1500,
    certifications: 'NIM Certified Mountaineer, Wilderness First Responder',
    specialties: 'Chopta Tungnath Summit, Kedarnath Trails',
    languages: 'Hindi, Garhwali, English',
    phone: '',
    bio: ''
  });
  const [guideSubmitSuccess, setGuideSubmitSuccess] = useState(false);

  const filteredGuides = guides.filter(g => {
    if (filterType === 'trek') return g.title?.toLowerCase().includes('trek') || g.title?.toLowerCase().includes('mountaineer') || g.title?.toLowerCase().includes('expedition');
    if (filterType === 'wildlife') return g.title?.toLowerCase().includes('wildlife') || g.title?.toLowerCase().includes('naturalist');
    if (filterType === 'culture') return g.title?.toLowerCase().includes('historian') || g.title?.toLowerCase().includes('pilgrim') || g.title?.toLowerCase().includes('heritage');
    return true;
  });

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setInquiryGuide(null);
      setInquiryForm({ name: '', phone: '', dates: '', trek: '' });
    }, 2000);
  };

  const handleAvatarFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setGuideAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRegisterGuideSubmit = (e) => {
    e.preventDefault();
    if (!guideForm.name || !guideForm.phone) {
      alert('Please fill guide name and phone number');
      return;
    }

    const newGuidePayload = {
      id: `gd-${Date.now()}`,
      name: guideForm.name,
      title: guideForm.title,
      base: guideForm.base,
      experienceYears: Number(guideForm.experienceYears) || 5,
      avatar: guideAvatarPreview || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      coverImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
      certifications: guideForm.certifications ? guideForm.certifications.split(',').map(c => c.trim()) : ['Verified Himalayan Scout'],
      specialties: guideForm.specialties ? guideForm.specialties.split(',').map(s => s.trim()) : ['High Peaks'],
      languages: guideForm.languages ? guideForm.languages.split(',').map(l => l.trim()) : ['Hindi', 'English'],
      dailyRate: Number(guideForm.dailyRate) || 1500,
      rating: 5.0,
      tripsLed: 1,
      bio: guideForm.bio || 'Native Himalayan scout dedicated to high-altitude safety and eco-conscious mountain expeditions.',
      phone: guideForm.phone,
      whatsapp: guideForm.phone.replace(/[^0-9]/g, ''),
      verified: true,
      badge: 'Verified Himalayan Scout'
    };

    if (onAddNewGuide) {
      onAddNewGuide(newGuidePayload);
    }

    setGuideSubmitSuccess(true);
    setTimeout(() => {
      setGuideSubmitSuccess(false);
      setRegisterModalOpen(false);
      setGuideAvatarPreview('');
      setGuideForm({
        name: '',
        title: 'Senior Mountain Trek Leader',
        base: 'Joshimath, Chamoli',
        experienceYears: 5,
        dailyRate: 1500,
        certifications: 'NIM Certified Mountaineer, Wilderness First Responder',
        specialties: 'Chopta Tungnath Summit, Kedarnath Trails',
        languages: 'Hindi, Garhwali, English',
        phone: '',
        bio: ''
      });
    }, 1600);
  };

  return (
    <section id="mountain-guides" className="py-16 bg-slate-50 dark:bg-[#090E1A] text-slate-900 dark:text-white relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-100 dark:bg-sky-500/15 border border-sky-300 dark:border-sky-500/30 text-sky-800 dark:text-sky-300 text-xs font-semibold tracking-wide uppercase mb-3">
              <Compass className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>Native Himalayan Mountain Scouts</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white font-serif tracking-tight">
              Certified Local Guides &amp; Trek Leaders
            </h2>
            <p className="mt-2 text-slate-700 dark:text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Real verified native scouts: NIM mountaineering graduates, high-altitude leaders, and local storytellers across Garhwal and Kumaon.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setRegisterModalOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-xl transition flex items-center gap-2 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Register as Verified Guide</span>
            </button>
          </div>
        </div>

        {guides.length === 0 ? (
          /* Clean Empty State when zero guides registered */
          <div className="my-8 max-w-2xl mx-auto">
            <EmptyState
              icon={Compass}
              title="No Mountain Guides Registered Yet"
              description="Are you a certified NIM mountaineer, forest naturalist, or native high-altitude storyteller from Uttarakhand? Join our verified mountain leadership guild."
              actionLabel="Register as First Verified Guide"
              onAction={() => setRegisterModalOpen(true)}
            />
          </div>
        ) : (
          /* Active Guides Grid */
          <>
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                { id: 'all', label: `All Guides (${guides.length})` },
                { id: 'trek', label: 'Trek Leaders (NIM Certified)' },
                { id: 'wildlife', label: 'Wildlife Naturalists' },
                { id: 'culture', label: 'Heritage & Pilgrimage' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setFilterType(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                    filterType === cat.id
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black shadow-lg'
                      : 'bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGuides.length === 0 ? (
                <div className="col-span-full">
                  <EmptyState
                    icon={Compass}
                    title="No Guides in this Category"
                    description="No mountain leaders currently match this category filter. View all leaders or register yourself."
                    actionLabel="View All Guides"
                    onAction={() => setFilterType('all')}
                  />
                </div>
              ) : (
                filteredGuides.map(guide => (
                <div
                  key={guide.id}
                  className="bg-white dark:bg-[#101728] rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 hover:border-sky-400/50 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between group hover:-translate-y-1.5 shadow-lg dark:shadow-xl backdrop-blur-md"
                >
                  <div>
                    {/* Cover Image & Badges */}
                    <div className="relative h-48 bg-slate-900 overflow-hidden">
                      <img
                        src={guide.coverImage}
                        alt={guide.name}
                        onError={handleImageError}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                      
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-emerald-300 text-xs font-bold border border-emerald-500/40">
                          {guide.badge}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-bold border border-white/20 shadow">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{guide.rating}</span>
                      </div>

                      <div className="absolute bottom-3 left-4 right-4 text-xs text-amber-300 font-semibold flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">{guide.base}</span>
                      </div>
                    </div>

                    {/* Profile Header & Bio */}
                    <div className="p-6">
                      <div className="flex items-center gap-3.5 mb-3">
                        <img
                          src={guide.avatar}
                          alt={guide.name}
                          className="w-12 h-12 rounded-2xl object-cover border-2 border-sky-400/60 shadow-lg flex-shrink-0"
                        />
                        <div>
                          <h4 className="font-bold text-lg font-serif text-slate-950 dark:text-white">{guide.name}</h4>
                          <p className="text-xs text-sky-700 dark:text-sky-300 font-semibold leading-snug">{guide.title}</p>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">{guide.experienceYears} Years Himalayan Experience</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-4">
                        {guide.bio}
                      </p>

                      {/* Specialties */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {guide.specialties?.slice(0, 3).map((sp, i) => (
                          <span key={i} className="text-[10px] px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5">
                            ✦ {sp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Booking CTA */}
                  <div className="p-6 pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase block font-semibold">Daily Rate</span>
                      <span className="text-xl font-extrabold text-amber-700 dark:text-amber-400 font-serif">₹{guide.dailyRate}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">/day</span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => onBookGuide(guide)}
                        className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 rounded-xl text-xs font-bold transition shadow cursor-pointer"
                      >
                        Book Scout
                      </button>
                    </div>
                  </div>
                </div>
              )))}
            </div>
          </>
        )}

      </div>

      {/* Guide Registration Modal */}
      {registerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-white dark:bg-[#0C1629] text-slate-900 dark:text-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-sky-500/30 relative my-6 max-h-[90vh] overflow-y-auto text-xs">
            
            <button
              onClick={() => setRegisterModalOpen(false)}
              className="absolute top-5 right-5 text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white font-bold cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {guideSubmitSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3 border border-emerald-300 dark:border-emerald-500/30 animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-serif text-slate-950 dark:text-white">Guide Registered!</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
                  Your certified guide profile has been published to SwargBhraman. Travelers can now hire you directly!
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegisterGuideSubmit} className="space-y-3.5">
                <div>
                  <span className="text-[10px] font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider block">
                    Join SwargBhraman Direct Guide Network
                  </span>
                  <h3 className="text-xl font-bold font-serif text-slate-950 dark:text-white mt-0.5">
                    Register as Verified Local Guide
                  </h3>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    100% of traveler daily rates go directly to you with zero platform commission.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Arjun Rawat"
                      value={guideForm.name}
                      onChange={(e) => setGuideForm({ ...guideForm, name: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-sky-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="9876543210"
                      value={guideForm.phone}
                      onChange={(e) => setGuideForm({ ...guideForm, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-sky-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">Professional Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Senior Mountain Trek Leader &amp; NIM Graduate"
                    value={guideForm.title}
                    onChange={(e) => setGuideForm({ ...guideForm, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">Base District / Town</label>
                    <input
                      type="text"
                      placeholder="e.g. Joshimath / Almora"
                      value={guideForm.base}
                      onChange={(e) => setGuideForm({ ...guideForm, base: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-sky-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Daily Rate (₹)</label>
                    <input
                      type="number"
                      placeholder="1500"
                      value={guideForm.dailyRate}
                      onChange={(e) => setGuideForm({ ...guideForm, dailyRate: e.target.value })}
                      className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-sky-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Certifications (Comma separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. NIM Certified Mountaineer, Wilderness First Responder"
                    value={guideForm.certifications}
                    onChange={(e) => setGuideForm({ ...guideForm, certifications: e.target.value })}
                    className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Specialties / Circuits</label>
                  <input
                    type="text"
                    placeholder="e.g. Kedarnath Trek, Chopta Chandrashila, Valley of Flowers"
                    value={guideForm.specialties}
                    onChange={(e) => setGuideForm({ ...guideForm, specialties: e.target.value })}
                    className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-sky-400"
                  />
                </div>

                {/* Profile Photo Upload */}
                <div className="p-3 bg-black/40 rounded-2xl border border-white/10 space-y-1.5">
                  <span className="font-bold text-sky-300 text-xs block">Profile Photo:</span>
                  <label className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-dashed border-sky-500/50 hover:border-sky-400 bg-sky-500/5 cursor-pointer text-slate-300">
                    <Upload className="w-3.5 h-3.5 text-sky-400" />
                    <span>Upload Guide Photo</span>
                    <input type="file" accept="image/*" onChange={handleAvatarFile} className="hidden" />
                  </label>
                  {guideAvatarPreview && (
                    <div className="flex items-center gap-2 pt-1">
                      <img src={guideAvatarPreview} alt="Guide preview" className="w-10 h-10 rounded-xl object-cover border border-sky-400" />
                      <span className="text-[10px] text-emerald-400">Photo attached successfully</span>
                    </div>
                  )}
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setRegisterModalOpen(false)}
                    className="flex-1 py-2.5 border border-white/10 rounded-xl font-semibold text-slate-300 hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white rounded-xl font-bold transition shadow"
                  >
                    Submit & Register Guide
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
