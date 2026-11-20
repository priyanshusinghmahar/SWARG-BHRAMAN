import React, { useState } from 'react';
import { handleImageError } from '../utils/imageFallback';
import { Compass, ShieldCheck, Star, Phone, MessageSquare, Award, CheckCircle2, MapPin, Calendar, ArrowRight, Languages } from 'lucide-react';

export default function GuidesSection({ guides, onBookGuide }) {
  const [filterType, setFilterType] = useState('all');
  const [inquiryGuide, setInquiryGuide] = useState(null);
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({ name: '', phone: '', dates: '', trek: '' });

  const filteredGuides = guides.filter(g => {
    if (filterType === 'trek') return g.title.toLowerCase().includes('trek') || g.title.toLowerCase().includes('mountaineer') || g.title.toLowerCase().includes('expedition');
    if (filterType === 'wildlife') return g.title.toLowerCase().includes('wildlife') || g.title.toLowerCase().includes('naturalist');
    if (filterType === 'culture') return g.title.toLowerCase().includes('historian') || g.title.toLowerCase().includes('pilgrim') || g.title.toLowerCase().includes('heritage');
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

  return (
    <section id="mountain-guides" className="py-20 bg-[#090E1A] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-300 text-xs font-semibold tracking-wide uppercase mb-3">
              <Compass className="w-3.5 h-3.5 text-sky-400" />
              Native Himalayan Mountain Scouts
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-serif">
              Certified Local Guides & Trek Leaders
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Explore Uttarakhand with certified native guides: NIM mountaineering leaders for high bugyals, licensed Corbett naturalists for tiger tracking, and Kumaon heritage storytellers.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Guides' },
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
                    : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGuides.map(guide => (
            <div
              key={guide.id}
              className="bg-[#101728] rounded-3xl overflow-hidden border border-white/10 hover:border-sky-400/50 hover:shadow-2xl hover:shadow-sky-950/40 transition-all duration-500 flex flex-col justify-between group hover:-translate-y-1.5 backdrop-blur-md"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101728] via-transparent to-black/30" />
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-emerald-300 text-xs font-bold border border-emerald-500/40">
                      {guide.badge}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-bold border border-white/20 shadow">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{guide.rating}</span>
                    <span className="text-slate-400 font-normal">({guide.tripsLed} summits)</span>
                  </div>

                  {/* Base location */}
                  <div className="absolute bottom-3 left-4 right-4 text-xs text-amber-300 font-semibold flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">{guide.base}</span>
                  </div>
                </div>

                {/* Profile Header & Bio */}
                <div className="p-6">
                  <div className="flex items-center gap-3.5 mb-4">
                    <img
                      src={guide.avatar}
                      alt={guide.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500/40 shadow-md flex-shrink-0"
                    />
                    <div>
                      <h3 className="font-bold text-white text-lg font-serif leading-tight">
                        {guide.name}
                      </h3>
                      <p className="text-xs text-emerald-400 font-medium mt-0.5">
                        {guide.title}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {guide.experienceYears} Years Himalayan Experience
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
                    {guide.bio}
                  </p>

                  {/* Certifications Badges */}
                  <div className="mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Accreditations & Certifications:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {guide.certifications.map((c, i) => (
                        <span key={i} className="px-2 py-0.5 bg-black/40 border border-white/10 rounded-md text-[10px] text-slate-300 flex items-center gap-1">
                          <Award className="w-3 h-3 text-emerald-400" />
                          <span>{c}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Circuits */}
                  <div className="p-3 bg-black/40 rounded-xl border border-white/10 mb-4 text-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Specialized Mountain Circuits:
                    </span>
                    <div className="flex flex-wrap gap-1 text-[11px] text-slate-300">
                      {guide.specialties.join(' • ')}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/10">
                    <span className="flex items-center gap-1">
                      <Languages className="w-3.5 h-3.5 text-slate-400" />
                      <span>{guide.languages.join(', ')}</span>
                    </span>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">Daily Fee</span>
                      <span className="text-base font-extrabold text-amber-300 font-serif">₹{guide.dailyRate} / day</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${guide.phone}`}
                    className="py-2.5 px-3 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Call Guide</span>
                  </a>

                  <a
                    href={`https://wa.me/${guide.whatsapp}?text=Namaste%20${encodeURIComponent(guide.name)}!%20I%20found%20your%20profile%20on%20SafarNama%20and%20would%20like%20to%20hire%20you%20as%20a%20guide.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 bg-white/10 hover:bg-white/15 text-white border border-white/15 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onBookGuide(guide)}
                    className="py-2.5 px-3 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-slate-950 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-1.5 shadow"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Hire for Trip</span>
                  </button>

                  <button
                    onClick={() => setInquiryGuide(guide)}
                    className="py-2.5 px-3 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                  >
                    <span>Custom Route</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Guide Custom Route Inquiry Modal */}
      {inquiryGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#0E201D] text-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-emerald-500/30 relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setInquiryGuide(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white text-lg font-bold"
            >
              ✕
            </button>

            {inquirySent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white font-serif">Inquiry Sent to {inquiryGuide.name}!</h3>
                <p className="text-xs text-slate-300 mt-2">
                  The guide will review your planned route and reply on your phone/WhatsApp ({inquiryForm.phone}) shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs">
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Direct Guide Consultation</span>
                  <h3 className="text-xl font-bold text-white font-serif mt-0.5">
                    Plan Custom Route with {inquiryGuide.name}
                  </h3>
                  <p className="text-xs text-slate-400">{inquiryGuide.title} • {inquiryGuide.base}</p>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priyanshu Singh Mahar"
                    value={inquiryForm.name}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Phone / WhatsApp Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={inquiryForm.phone}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Planned Travel Dates</label>
                  <input
                    type="text"
                    placeholder="e.g. Dec 15 - Dec 20, 2026"
                    value={inquiryForm.dates}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, dates: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Trek / Region you want to explore</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chopta-Chandrashila summit trek or Kasar Devi cultural walk"
                    value={inquiryForm.trek}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, trek: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setInquiryGuide(null)}
                    className="flex-1 py-2.5 border border-white/10 rounded-xl font-bold text-slate-300 hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white rounded-xl font-bold shadow-md"
                  >
                    Send to Guide
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
