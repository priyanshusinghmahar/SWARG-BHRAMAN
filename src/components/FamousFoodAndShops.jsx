import React, { useState } from 'react';
import { UtensilsCrossed, Phone, MessageSquare, MapPin, Clock, Star, Navigation, Sparkles, Coffee } from 'lucide-react';

export default function FamousFoodAndShops({ foodShops, onLocateOnMap }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredShops = foodShops.filter(shop => {
    if (activeCategory === 'sweets') return shop.category.toLowerCase().includes('sweet') || shop.specialty.toLowerCase().includes('mithai');
    if (activeCategory === 'thali') return shop.category.toLowerCase().includes('restaurant') || shop.category.toLowerCase().includes('kitchen');
    if (activeCategory === 'arts') return shop.category.toLowerCase().includes('handloom') || shop.category.toLowerCase().includes('handicraft') || shop.category.toLowerCase().includes('craft');
    return true;
  });

  return (
    <section id="famous-shops" className="py-20 bg-slate-50 dark:bg-[#07100F] text-slate-900 dark:text-white relative transition-colors duration-300">
      {/* Decorative Warm Ambient Glow */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-semibold tracking-wide uppercase mb-3">
              <UtensilsCrossed className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              Mountain Gastronomy &amp; Heritage Bazaars
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white font-serif">
              Famous Pahadi Food Joints &amp; Traditional Art Shops
            </h2>
            <p className="mt-3 text-slate-700 dark:text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Taste legendary 160-year-old Bal Mithai from Almora, savor piping hot Bhatt ki Churkani with Mandua rotis, and visit certified handloom emporiums.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Shops' },
              { id: 'sweets', label: 'Bal Mithai & Sweets' },
              { id: 'thali', label: 'Pahadi Thalis & Dining' },
              { id: 'arts', label: 'Handloom & Arts Emporiums' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-amber-950/40'
                    : 'bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Shops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredShops.map(shop => (
            <div
              key={shop.id}
              className="bg-white dark:bg-[#0E201D]/90 rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-950/30 transition-all duration-500 flex flex-col group hover:-translate-y-1.5 shadow-lg dark:shadow-xl backdrop-blur-md"
            >
              {/* Image & Badges */}
              <div className="relative h-56 bg-slate-900 overflow-hidden">
                <img
                  src={shop.image}
                  alt={shop.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-amber-300 text-xs font-bold border border-amber-500/40">
                    {shop.badge}
                  </span>
                </div>

                {/* Rating */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-bold border border-white/20 shadow">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{shop.rating}</span>
                  <span className="text-slate-300 font-normal">({shop.reviewsCount})</span>
                </div>

                {/* Title & Location on Image */}
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="font-bold text-xl font-serif leading-snug drop-shadow text-white">
                    {shop.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-amber-300 mt-1">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">{shop.location}</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="inline-block px-3 py-1 rounded-lg bg-amber-100 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/20 text-[11px] font-bold mb-3">
                    {shop.category}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2 mb-4">
                    {shop.description}
                  </p>

                  {/* Specialty Dish */}
                  <div className="p-3.5 bg-amber-50/80 dark:bg-black/40 rounded-2xl border border-amber-200 dark:border-white/10 mb-4">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-0.5">
                      Signature Specialty:
                    </div>
                    <div className="text-xs font-bold text-amber-800 dark:text-amber-300">
                      {shop.specialty}
                    </div>
                  </div>

                  {/* Must Try List */}
                  <div className="mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                      Must Try Dishes / Souvenirs:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {shop.mustTry.map((item, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[11px] text-slate-700 dark:text-slate-300 font-medium"
                        >
                          ✦ {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Timings & Price */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-200 dark:border-white/10">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                      <span className="truncate">{shop.timings}</span>
                    </div>
                    <div className="text-right font-semibold text-amber-700 dark:text-amber-400">
                      {shop.priceRange}
                    </div>
                  </div>
                </div>

                {/* Direct Contacts & Actions */}
                <div className="pt-4 mt-4 border-t border-slate-200 dark:border-white/10 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`tel:${shop.contact}`}
                      className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>{shop.contact.slice(0, 14)}</span>
                    </a>
                    
                    <a
                      href={`https://wa.me/${shop.whatsapp}?text=Namaste!%20I%20found%20${encodeURIComponent(shop.name)}%20on%20SwargBhraman.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shadow"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>

                  <button
                    onClick={() => onLocateOnMap(shop)}
                    className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-white border border-slate-300 dark:border-transparent rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>Get Directions on Map</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
