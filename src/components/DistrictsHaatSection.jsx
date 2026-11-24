import React, { useState } from 'react';
import { handleImageError } from '../utils/imageFallback';
import { 
  ShoppingBag, ShieldCheck, Star, Sparkles, MapPin, 
  Truck, ArrowRight, CheckCircle2, Search, Filter, 
  Tag, Info, HeartHandshake, Package 
} from 'lucide-react';
import EmptyState from './EmptyState';

export default function DistrictsHaatSection({ 
  districtsData = [], 
  onBuyProduct 
}) {
  const [selectedDistrictId, setSelectedDistrictId] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedStoryId, setExpandedStoryId] = useState(null);

  // Flatten all products across districts
  const allProducts = districtsData.flatMap(d => d.products || []);

  const filteredProducts = allProducts.filter(p => {
    // District filter
    if (selectedDistrictId !== 'all' && p.districtId !== selectedDistrictId) {
      return false;
    }

    // Category filter
    if (selectedCategory === 'gi' && !p.giTagged) return false;
    if (selectedCategory === 'sweets' && !p.category.toLowerCase().includes('sweet')) return false;
    if (selectedCategory === 'grains' && !p.category.toLowerCase().includes('grain')) return false;
    if (selectedCategory === 'metal' && !p.category.toLowerCase().includes('metalware')) return false;
    if (selectedCategory === 'herbal' && !p.category.toLowerCase().includes('herbal') && !p.category.toLowerCase().includes('ayurvedic')) return false;
    if (selectedCategory === 'handicraft' && !p.category.toLowerCase().includes('handicraft') && !p.category.toLowerCase().includes('handloom') && !p.category.toLowerCase().includes('folk art')) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = 
        p.title.toLowerCase().includes(q) ||
        p.district.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.artisanGuild.toLowerCase().includes(q) ||
        p.originVillage.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });

  const activeDistrictInfo = selectedDistrictId !== 'all' 
    ? districtsData.find(d => d.id === selectedDistrictId) 
    : null;

  return (
    <section id="districts-haat" className="py-20 bg-slate-50 dark:bg-[#090E1A] text-slate-900 dark:text-white relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-bold tracking-wide uppercase mb-3">
              <ShoppingBag className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              SwargBhraman Haat • 100% Direct District Procurement
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-slate-950 dark:text-white tracking-tight">
              Famous Things of All 13 Districts
            </h2>
            <p className="mt-3 text-slate-700 dark:text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Explore signature produce, handicrafts, and sweet legacies of every district in Uttarakhand. Order directly through us with zero middlemen and guaranteed direct payments to rural village cooperatives.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Bal Mithai, Rajma, Copper, Honey..."
              className="w-full bg-white dark:bg-[#121B2F] border border-slate-300 dark:border-white/15 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition shadow-sm dark:shadow-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* 13 Districts Pill Selector Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3 text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
            <span>Filter by Uttarakhand District ({districtsData.length} Districts):</span>
            <span className="text-amber-700 dark:text-amber-400 font-bold">{filteredProducts.length} Items Available</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
            <button
              onClick={() => setSelectedDistrictId('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                selectedDistrictId === 'all'
                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-extrabold shadow-md'
                  : 'bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none'
              }`}
            >
              <span>🏔️</span>
              <span>All 13 Districts</span>
            </button>

            {districtsData.map(d => (
              <button
                key={d.id}
                onClick={() => setSelectedDistrictId(d.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                  selectedDistrictId === d.id
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black shadow-lg'
                    : 'bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none'
                }`}
              >
                <span>📍</span>
                <span>{d.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-slate-200 dark:border-white/10 scrollbar-none text-xs">
          {[
            { id: 'all', label: 'All Specialties' },
            { id: 'gi', label: '🌟 GI-Tagged Authentic' },
            { id: 'sweets', label: '🍬 Pahadi Sweets' },
            { id: 'grains', label: '🌾 Organic Grains & Pulses' },
            { id: 'metal', label: '🪔 Copper & Ironware' },
            { id: 'handicraft', label: '🎨 Handloom & Aipan' },
            { id: 'herbal', label: '🌿 Herbal & Honey' }
          ].map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3.5 py-1.5 rounded-xl font-semibold transition whitespace-nowrap ${
                selectedCategory === c.id
                  ? 'bg-slate-900 text-white dark:bg-white/20 dark:text-white border border-slate-700 dark:border-white/30 font-bold shadow-sm'
                  : 'bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/5'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Selected District Spotlight Banner */}
        {activeDistrictInfo && (
          <div className="mb-10 bg-emerald-50/90 dark:bg-gradient-to-r dark:from-[#0C221E] dark:via-[#0E2824] dark:to-[#0A1A18] rounded-3xl p-6 sm:p-8 border border-emerald-300 dark:border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg dark:shadow-2xl">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-300 uppercase">
                <span>📍 {activeDistrictInfo.region} Region</span>
                <span>•</span>
                <span>Elevation: {activeDistrictInfo.altitude}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-950 dark:text-white">
                {activeDistrictInfo.name} District
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed">
                {activeDistrictInfo.tagline}
              </p>
              
              {/* Famous Things Tag Ribbon */}
              <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
                {activeDistrictInfo.famousThings.map((thing, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-white dark:bg-white/10 rounded-lg text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-white/10 font-medium">
                    ✦ {thing}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedDistrictId('all')}
              className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white underline self-start md:self-auto cursor-pointer"
            >
              View All Districts →
            </button>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full">
              <EmptyState
                icon={ShoppingBag}
                title="No Products in This Selection"
                description={`Currently no direct haat craft items found for the active filter. Reset filters to browse all 13 districts.`}
                actionLabel="View All Products"
                onAction={() => { setSelectedDistrictId('all'); setSelectedCategory('all'); setSearchQuery(''); }}
              />
            </div>
          ) : (
            filteredProducts.map(prod => (
            <div
              key={prod.id}
              className="bg-white dark:bg-[#101728] rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 hover:border-amber-400/40 transition duration-300 flex flex-col justify-between group shadow-lg dark:shadow-xl"
            >
              <div>
                {/* Product Image & Badges */}
                <div className="relative h-60 bg-black overflow-hidden">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    onError={handleImageError}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-amber-300 text-xs font-bold border border-amber-500/30 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>{prod.district}</span>
                    </span>

                    {prod.giTagged && (
                      <span className="px-2.5 py-1 rounded-full bg-amber-500/30 backdrop-blur-md text-amber-300 text-[10px] font-extrabold uppercase border border-amber-500/40">
                        GI Tagged
                      </span>
                    )}
                  </div>

                  {/* Weight / Pack Quantity */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                    <span className="bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-mono text-emerald-300 border border-white/10">
                      📦 {prod.weight}
                    </span>
                    <span className="bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-semibold text-amber-300 border border-white/10">
                      ★ {prod.rating} ({prod.reviewsCount})
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-0.5">
                      {prod.category}
                    </span>
                    <h4 className="text-lg font-bold font-serif text-slate-950 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition leading-snug">
                      {prod.title}
                    </h4>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mt-0.5">
                      {prod.artisanGuild} • {prod.originVillage}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                    {prod.description}
                  </p>

                  {/* Product Story Accordion Toggle */}
                  <div>
                    <button
                      onClick={() => setExpandedStoryId(expandedStoryId === prod.id ? null : prod.id)}
                      className="text-[11px] font-bold text-amber-700 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 flex items-center gap-1 transition cursor-pointer"
                    >
                      <Info className="w-3 h-3" />
                      <span>{expandedStoryId === prod.id ? 'Hide Heritage Details' : 'Read Origin & Craft Story'}</span>
                    </button>
                    {expandedStoryId === prod.id && (
                      <div className="mt-2 p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed animate-in fade-in">
                        <strong className="text-slate-950 dark:text-white block mb-1">Authentic Himalayan Origin:</strong>
                        {prod.description}
                        <div className="mt-2 text-slate-500 dark:text-slate-400 flex items-center justify-between pt-1 border-t border-slate-200 dark:border-white/5">
                          <span>Shelf Life: {prod.shelfLife}</span>
                          <span className="text-emerald-700 dark:text-emerald-400 font-semibold">100% Genuine</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Price & Purchase CTA */}
              <div className="p-6 pt-0">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-white/10">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">Direct Haat Price</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-extrabold font-serif text-amber-700 dark:text-amber-300">
                        ₹{prod.price.toLocaleString('en-IN')}
                      </span>
                      {prod.originalPrice && (
                        <span className="text-xs text-slate-400 line-through">
                          ₹{prod.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block font-bold">✓ IN STOCK</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Himalayan Speed Post</span>
                  </div>
                </div>

                <button
                  onClick={() => onBuyProduct(prod)}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-slate-950 rounded-2xl font-extrabold text-xs shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Buy Direct from District Haat</span>
                </button>
              </div>
            </div>
          )))}
        </div>

        {/* Zero-Middleman Guarantee Banner */}
        <div className="mt-16 bg-emerald-50 dark:bg-gradient-to-r dark:from-emerald-950/70 dark:via-teal-950/50 dark:to-[#071311] rounded-3xl p-8 border border-emerald-300 dark:border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-400/40 flex items-center justify-center text-3xl flex-shrink-0">
              🌿
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white">
                How "Purchase Through Us" Works
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
                When you order through SwargBhraman, we purchase directly from the verified rural self-help groups (SHGs), sweetmakers, and artisan cooperatives at full fair price, pack them in eco-friendly pine containers, and ship directly to your door with courier tracking.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="text-center sm:text-right text-xs">
              <span className="text-amber-800 dark:text-amber-300 font-bold block">Free Shipping on ₹500+</span>
              <span className="text-slate-500 dark:text-slate-400">All India Doorstep Delivery</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
