import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, Star, Sparkles, ShieldCheck, Truck, 
  CheckCircle, ArrowRight, Heart, Filter, Tag 
} from 'lucide-react';
import { SWARGBHRAMAN_MERCHANDISE, MERCHANDISE_CATEGORIES } from '../data/merchandiseData';
import MerchandiseModal from './MerchandiseModal';
import EmptyState from './EmptyState';

export default function MerchandiseSection({ onConfirmOrder }) {
  const [selectedCategory, setSelectedCategory] = useState('All Items');
  const [activeModalProduct, setActiveModalProduct] = useState(null);
  const [favorites, setFavorites] = useState({});

  // Dynamic Merchandise loaded from localStorage (synced with Admin Edits)
  const [merchandiseItems, setMerchandiseItems] = useState(() => {
    try {
      const saved = localStorage.getItem('swargbraman_merchandise');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return SWARGBHRAMAN_MERCHANDISE;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem('swargbraman_merchandise');
        if (saved) setMerchandiseItems(JSON.parse(saved));
      } catch (e) {}
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleFavorite = (id) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredProducts = selectedCategory === 'All Items'
    ? merchandiseItems
    : merchandiseItems.filter(p => p.category === selectedCategory);

  return (
    <section id="merchandise-section" className="py-16 bg-slate-50 dark:bg-[#080D1A] text-slate-900 dark:text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-semibold tracking-wide uppercase mb-3">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Official SwargBhraman Gear & Devbhoomi Goods</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white font-serif tracking-tight">
              Merchandise & Mountain Explorer Store
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Every purchase directly supports rural cottage cooperatives and mountain trail maintenance across Uttarakhand. Authentic, sustainable, and handcrafted for high peaks.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1 bg-emerald-500/15 dark:bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30 dark:border-emerald-500/20">
              <Truck className="w-3.5 h-3.5" />
              <span>Free Express Delivery Across India</span>
            </span>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center gap-2 pb-3 mb-8">
          {MERCHANDISE_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition whitespace-nowrap border ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20'
                  : 'bg-white dark:bg-[#0E1627] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/30 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full">
              <EmptyState
                icon={ShoppingBag}
                title="No Merchandise Found"
                description={`Currently no handcrafted merchandise items match the filter "${selectedCategory}". Check back soon or reset category.`}
                actionLabel="View All Items"
                onAction={() => setSelectedCategory('All Items')}
              />
            </div>
          ) : (
            filteredProducts.map(product => {
            const isFav = !!favorites[product.id];
            const discountPercent = product.originalPrice 
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
              : 0;

            return (
              <div
                key={product.id}
                className="bg-white dark:bg-[#0E1627] rounded-3xl border border-slate-200 dark:border-white/10 hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between group overflow-hidden shadow-md dark:shadow-xl hover:-translate-y-1"
              >
                <div>
                  {/* Image Container with Badges */}
                  <div className="relative h-56 w-full overflow-hidden bg-black/40">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      {product.badge && (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider shadow">
                          {product.badge}
                        </span>
                      )}
                      {discountPercent > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold shadow">
                          {discountPercent}% OFF
                        </span>
                      )}
                    </div>

                    {/* Wishlist Heart */}
                    <button
                      type="button"
                      onClick={() => toggleFavorite(product.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:text-rose-400 transition"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>

                    {/* Category Overlay */}
                    <div className="absolute bottom-2 left-3 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] text-slate-300">
                      {product.category}
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-4 space-y-2">
                    {/* Rating & Artisan Guild */}
                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{product.rating}</span>
                        <span className="text-slate-400 dark:text-slate-500">({product.reviewsCount})</span>
                      </div>
                      <span className="truncate max-w-[130px] text-[10px] text-slate-500 dark:text-slate-400">
                        {product.artisanGuild?.split('•')[0]}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm font-serif line-clamp-1 group-hover:text-amber-600 dark:group-hover:text-amber-300 transition">
                      {product.title}
                    </h3>
                    
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Key feature pills */}
                    <div className="pt-1 flex flex-wrap gap-1">
                      {product.features?.slice(0, 2).map((feat, i) => (
                        <span key={i} className="text-[9px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/5 truncate max-w-full">
                          ✦ {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer with Price & Buy Action */}
                <div className="p-4 pt-2 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-extrabold text-amber-600 dark:text-amber-400 font-serif">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-slate-400 dark:text-slate-500 line-through">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold block">In Stock • Verified</span>
                  </div>

                  <button
                    onClick={() => setActiveModalProduct(product)}
                    className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 rounded-xl text-xs font-extrabold shadow-md transition flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>
            );
          }))}
        </div>

        {/* Bottom Trust Guarantee Strip */}
        <div className="mt-12 p-6 rounded-3xl bg-[#0C1527] border border-amber-500/20 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <span className="text-3xl">🏔️</span>
            <h4 className="font-bold text-white text-xs font-serif">100% Himalayan Authenticity</h4>
            <p className="text-[11px] text-slate-400">Certified by Almora and Chamoli artisan cooperatives.</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-3xl">📦</span>
            <h4 className="font-bold text-white text-xs font-serif">Eco-Friendly Wooden Packing</h4>
            <p className="text-[11px] text-slate-400">Zero plastic packaging with dried pine leaves cushioning.</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-3xl">🤝</span>
            <h4 className="font-bold text-white text-xs font-serif">Direct Artisan Revenue Share</h4>
            <p className="text-[11px] text-slate-400">70% of product margins return to rural native families.</p>
          </div>
        </div>

      </div>

      {/* Checkout Modal */}
      <MerchandiseModal
        product={activeModalProduct}
        isOpen={!!activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
        onConfirmOrder={onConfirmOrder}
      />
    </section>
  );
}
