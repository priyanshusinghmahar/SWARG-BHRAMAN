import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mountain, Calendar, Star, Compass, ArrowRight, Check, Eye } from 'lucide-react';
import { handleImageError } from '../utils/imageFallback';

export default function FamousLocations({ destinations, onBookLocation, onLocateOnMap, onAddToAIPlan }) {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchWord, setSearchWord] = useState('');

  const filterCategories = ['All', 'Garhwal', 'Kumaon', 'Spiritual & Adventure', 'Treks & Bugyals', 'Lakes & Hill Station', 'Wildlife & Safari'];

  const filtered = destinations.filter(dest => {
    const matchesFilter =
      selectedFilter === 'All' ||
      dest.region.includes(selectedFilter) ||
      dest.category.toLowerCase().includes(selectedFilter.toLowerCase());

    const matchesSearch =
      dest.name.toLowerCase().includes(searchWord.toLowerCase()) ||
      dest.tagline.toLowerCase().includes(searchWord.toLowerCase()) ||
      dest.highlights.some(h => h.toLowerCase().includes(searchWord.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  return (
    <section id="famous-locations" className="py-20 bg-[#090E1A] text-white relative">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-sky-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide uppercase mb-3">
              <Mountain className="w-3.5 h-3.5 text-amber-400" />
              Sacred Himalayan Geography
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-serif">
              Famous Locations in Devbhoomi
            </h2>
            <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              From the tranquil riverside ashrams of Rishikesh to the glacial shrines of Kedarnath and the artistic pine ridges of Almora.
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Search destination, trek, lake..."
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              className="w-full px-4 py-3 text-xs sm:text-sm bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-amber-400 text-white placeholder-slate-400 focus:outline-none backdrop-blur-md shadow-inner"
            />
          </div>
        </div>

        {/* Personal Suggester CTA Pill */}
        <div className="mb-6 p-3.5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-[#131D36] to-amber-950/30 border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🎯</span>
            <span className="text-slate-300">
              Need personalized guidance? Let our <strong className="text-amber-300">Personal Mountain Suggester</strong> match your exact mood, budget & group!
            </span>
          </div>
          <Link
            to="/personal-suggester"
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-sky-600 hover:from-purple-500 hover:to-sky-500 text-white font-bold transition flex items-center gap-1.5 shadow-md flex-shrink-0"
          >
            <span>Launch Suggester 🎯</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 overflow-x-auto pb-2">
          {filterCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
                selectedFilter === cat
                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-extrabold shadow-lg shadow-amber-950/40 border border-amber-400/40'
                  : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map(dest => (
            <div
              key={dest.id}
              className="bg-[#101728] rounded-3xl overflow-hidden border border-white/10 hover:border-amber-400/50 hover:shadow-2xl hover:shadow-amber-950/40 transition-all duration-500 flex flex-col group hover:-translate-y-1.5 backdrop-blur-md"
            >
              {/* Image & Floating Badges */}
              <div className="relative h-60 overflow-hidden bg-slate-900">
                <img
                  src={dest.image}
                  alt={dest.name}
                  onError={handleImageError}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101728] via-transparent to-black/30" />
                
                {/* Region & Category Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold border border-white/20">
                    {dest.region}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 backdrop-blur-md text-amber-300 text-[11px] font-semibold border border-amber-500/30">
                    {dest.category}
                  </span>
                </div>

                {/* Rating badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-bold border border-white/20 shadow">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{dest.rating}</span>
                  <span className="text-slate-400 font-normal">({dest.reviewsCount})</span>
                </div>

                {/* Title & Altitude over Image */}
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="text-2xl font-bold font-serif leading-tight text-white drop-shadow">
                    {dest.name}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-300 mt-1">
                    <span className="flex items-center gap-1 text-sky-300">
                      <Mountain className="w-3 h-3 text-sky-400" />
                      {dest.altitude}
                    </span>
                    <span className="flex items-center gap-1 text-amber-300">
                      <Calendar className="w-3 h-3 text-amber-400" />
                      {dest.bestTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                    {dest.description}
                  </p>

                  {/* Highlights */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Key Highlights:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {dest.highlights.slice(0, 3).map((hl, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                          <span className="truncate">{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Pricing & CTA */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Tours From</span>
                    <span className="text-xl font-black text-amber-400 font-serif">
                      ₹{dest.startingPrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onLocateOnMap(dest)}
                      className="p-2.5 text-slate-300 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 rounded-xl text-xs font-semibold transition"
                      title="View on Map"
                    >
                      <MapPin className="w-4 h-4 text-amber-400" />
                    </button>
                    <button
                      onClick={() => onBookLocation(dest)}
                      className="px-4 py-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-slate-950 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 shadow-lg shadow-amber-950/40"
                    >
                      <span>Book Trip</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
