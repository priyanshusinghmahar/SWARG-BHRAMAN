import React, { useState } from 'react';
import { handleImageError } from '../utils/imageFallback';
import { Palette, Phone, MessageSquare, ShieldCheck, MapPin, Sparkles, Star, Calendar, ShoppingBag, ExternalLink, CheckCircle } from 'lucide-react';

export default function ArtisansSection({ artisans, onBookWorkshop, onLocateOnMap, onOpenArtisanChat }) {
  const [selectedArtisan, setSelectedArtisan] = useState(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryData, setInquiryData] = useState({ name: '', phone: '', message: '', topic: 'workshop' });
  const [inquirySuccess, setInquirySuccess] = useState(false);

  const handleOpenInquiry = (artisan) => {
    setSelectedArtisan(artisan);
    setInquiryModalOpen(true);
    setInquirySuccess(false);
  };

  const handleSubmitInquiry = (e) => {
    e.preventDefault();
    setInquirySuccess(true);
    setTimeout(() => {
      setInquiryModalOpen(false);
      setInquirySuccess(false);
      setInquiryData({ name: '', phone: '', message: '', topic: 'workshop' });
    }, 2200);
  };

  return (
    <section id="artisans-crafts" className="py-20 bg-[#090E1A] text-white relative">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-rose-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold tracking-wide uppercase mb-3">
            <Palette className="w-3.5 h-3.5 text-rose-400" />
            Empowering Pahadi Guardians of Culture
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-serif">
            Connect Directly with Local Craftsmen & Heritage Studios
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Zero middlemen. Book hands-on masterclasses, buy certified Himalayan handicrafts, or arrange studio visits directly with Uttarakhand's hereditary artisans.
          </p>
        </div>

        {/* Artisans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artisans.map(artisan => (
            <div
              key={artisan.id}
              className="bg-[#101728] rounded-3xl overflow-hidden border border-white/10 hover:border-amber-400/50 hover:shadow-2xl hover:shadow-amber-950/30 transition-all duration-500 flex flex-col group hover:-translate-y-1.5 backdrop-blur-md"
            >
              {/* Top Hero Image of Craft */}
              <div className="relative h-52 bg-slate-900 overflow-hidden">
                <img
                  src={artisan.heroImage}
                  alt={artisan.craftType}
                  onError={handleImageError}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101728] via-transparent to-black/30" />
                
                {/* Craft Type Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-rose-300 text-xs font-bold border border-rose-500/40">
                    {artisan.craftType}
                  </span>
                </div>

                {/* Rating badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-bold border border-white/20 shadow">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{artisan.rating}</span>
                  <span className="text-slate-400 font-normal">({artisan.reviews})</span>
                </div>

                {/* Location at bottom of photo */}
                <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 font-medium truncate text-amber-300">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    {artisan.locationName}
                  </span>
                </div>
              </div>

              {/* Artisan Profile Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Master Artisan Bio Header */}
                  <div className="flex items-center gap-3.5 mb-4">
                    <img
                      src={artisan.avatar}
                      alt={artisan.name}
                      onError={handleImageError}
                      className="w-13 h-13 rounded-2xl object-cover border-2 border-amber-500/30 shadow-md flex-shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-white text-lg font-serif">
                          {artisan.name}
                        </h3>
                        {artisan.verified && (
                          <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" title="State Verified Master Artisan" />
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {artisan.experienceYears} Years Master Experience • {artisan.region}
                      </p>
                    </div>
                  </div>

                  {/* Story */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {artisan.story}
                  </p>

                  {/* Hands-on Workshop Offered */}
                  <div className="p-3.5 rounded-2xl bg-black/30 border border-rose-500/20 mb-4">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-rose-300 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                        Hands-on Masterclass:
                      </span>
                      <span className="font-extrabold text-amber-300">
                        ₹{artisan.workshopPrice} / person
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-normal">
                      {artisan.workshopOffered}
                    </p>
                  </div>

                  {/* Products Preview */}
                  <div className="mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Popular Direct Handcrafted Creations:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {artisan.products.slice(0, 2).map(prod => (
                        <div key={prod.id} className="p-2.5 bg-black/40 rounded-xl border border-white/10 text-[11px]">
                          <div className="font-semibold text-slate-200 truncate">{prod.title}</div>
                          <div className="text-rose-400 font-bold mt-0.5">₹{prod.price}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`tel:${artisan.contactPhone}`}
                      className="py-2.5 px-3 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Call Studio</span>
                    </a>
                    
                    <a
                      href={`https://wa.me/${artisan.whatsapp}?text=Namaste%20${encodeURIComponent(artisan.name)}!%20I%20found%20your%20craft%20on%20SafarNama.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onBookWorkshop(artisan)}
                      className="py-2.5 px-3 bg-gradient-to-r from-rose-700 to-orange-700 hover:from-rose-600 hover:to-orange-600 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Workshop</span>
                    </button>

                    <button
                      onClick={() => handleOpenInquiry(artisan)}
                      className="py-2.5 px-3 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                    >
                      <span>Custom Order</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Community Pledge Banner */}
        <div className="mt-14 bg-gradient-to-r from-amber-950/60 via-slate-900 to-emerald-950/60 border border-amber-500/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-md">
          <div className="max-w-2xl">
            <h3 className="text-xl sm:text-2xl font-bold text-white font-serif flex items-center gap-2">
              <span>🌾</span> Are you a local artisan, homestay host, or Pahadi folk artist?
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Join the SafarNama verified artisan guild for zero commission. List your craft products, offer guided weaving or woodcarving classes, and connect directly with conscious travelers.
            </p>
          </div>
          <button 
            onClick={() => window.location.hash = '#vendor-portal'}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap shadow-xl transition"
          >
            Open Artisan Vendor Portal
          </button>
        </div>

      </div>

      {/* Direct Artisan Inquiry Modal */}
      {inquiryModalOpen && selectedArtisan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0E221E] text-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-emerald-500/30 relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setInquiryModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white text-lg font-bold"
            >
              ✕
            </button>

            {inquirySuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/40">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white font-serif">Message Sent to {selectedArtisan.name}!</h3>
                <p className="text-xs text-slate-300 mt-2">
                  The artisan has received your message on their verified mobile number ({selectedArtisan.contactPhone}). They will respond via WhatsApp or phone shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-4 text-xs">
                <div>
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Direct Studio Inquiry</span>
                  <h3 className="text-xl font-bold text-white font-serif mt-0.5">
                    Connect with {selectedArtisan.name}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {selectedArtisan.craftType} • {selectedArtisan.locationName}
                  </p>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={inquiryData.name}
                    onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Phone / WhatsApp Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={inquiryData.phone}
                    onChange={(e) => setInquiryData({ ...inquiryData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">I am interested in</label>
                  <select
                    value={inquiryData.topic}
                    onChange={(e) => setInquiryData({ ...inquiryData, topic: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  >
                    <option value="workshop">Attending In-Person Studio Workshop</option>
                    <option value="custom-product">Ordering Custom Handcrafted Product</option>
                    <option value="studio-visit">Visiting the Studio / Homestay Consultation</option>
                    <option value="bulk-gifting">Himalayan Corporate / Wedding Gifting</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Your Message</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell the artisan about your planned visit date or specific requirements..."
                    value={inquiryData.message}
                    onChange={(e) => setInquiryData({ ...inquiryData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setInquiryModalOpen(false)}
                    className="flex-1 py-2.5 border border-white/10 rounded-xl font-semibold text-slate-300 hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-gradient-to-r from-rose-700 to-orange-700 hover:from-rose-600 hover:to-orange-600 text-white rounded-xl font-bold transition shadow-md"
                  >
                    Send Direct Message
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
