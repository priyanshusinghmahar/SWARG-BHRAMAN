import React, { useState } from 'react';
import { handleImageError } from '../utils/imageFallback';
import { 
  Building2, Landmark, MapPin, Calendar, Clock, 
  ShieldCheck, Star, ArrowRight, ExternalLink, Search, 
  Sparkles, Compass, CheckCircle2, Info, BookOpen 
} from 'lucide-react';

export default function TemplesAndHistorySection({ 
  sites = [], 
  onLocateOnMap, 
  onBookSitePass 
}) {
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSite, setSelectedSite] = useState(null);

  const filteredSites = sites.filter(s => {
    // Search query filter
    const matchesSearch = 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.architectureStyle.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Category / Region filter
    if (filterType === 'temple') return s.type === 'Temple';
    if (filterType === 'history') return s.type === 'Historical Place';
    if (filterType === 'garhwal') return s.region === 'Garhwal';
    if (filterType === 'kumaon') return s.region === 'Kumaon';
    return true;
  });

  return (
    <section id="temples-and-history" className="py-20 bg-[#090E1A] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wide uppercase mb-3">
              <Landmark className="w-4 h-4 text-amber-400" />
              1,200+ Years of Himalayan Heritage
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight">
              Famous Temples & Historical Places
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Discover the sacred soul of Devbhoomi: ancient Katyuri dynasty stone temples, sacred Panch Kedar shrines, Chand royal forts, and historic landmarks that shaped world history.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search temple, fort, district..."
              className="w-full bg-[#121B2F] border border-white/15 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 border-b border-white/10 scrollbar-none">
          {[
            { id: 'all', label: `All Sacred & Historic Sites (${sites.length})` },
            { id: 'temple', label: 'Sacred Temples & Jyotirlingas' },
            { id: 'history', label: 'Historical Forts & Monuments' },
            { id: 'garhwal', label: 'Garhwal Heritage' },
            { id: 'kumaon', label: 'Kumaon Heritage' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                filterType === tab.id
                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-extrabold shadow-md'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSites.map(site => (
            <div
              key={site.id}
              className="bg-[#101728] rounded-3xl overflow-hidden border border-white/10 hover:border-amber-400/50 transition duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                {/* Image & Badges */}
                <div className="relative h-56 bg-black overflow-hidden">
                  <img
                    src={site.image}
                    alt={site.name}
                    onError={handleImageError}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101728] via-transparent to-black/50" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-amber-300 text-xs font-bold border border-amber-500/30">
                      {site.badge}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold uppercase border border-emerald-500/30">
                      {site.region}
                    </span>
                  </div>

                  {/* Built Era & Altitude */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                    <span className="bg-black/60 px-2 py-0.5 rounded text-[11px] font-mono text-emerald-300">
                      {site.builtEra}
                    </span>
                    <span className="bg-black/60 px-2 py-0.5 rounded text-[11px] font-semibold text-amber-300">
                      📍 {site.altitude}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                      {site.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-serif text-white group-hover:text-emerald-300 transition">
                      {site.name}
                    </h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{site.district}, {site.region} Uttarakhand</span>
                    </p>
                  </div>

                  {/* Architecture & Deity Tag */}
                  <div className="p-3 bg-white/5 rounded-2xl border border-white/5 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-[10px] uppercase font-bold">Presiding Deity / Era:</span>
                      <span className="text-white font-bold truncate max-w-[180px]">{site.deity}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-[10px] uppercase font-bold">Architecture:</span>
                      <span className="text-emerald-300 font-medium truncate max-w-[180px]">{site.architectureStyle}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {site.significance}
                  </p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-white/10">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{site.timings.split('(')[0]}</span>
                  </span>
                  <span className="text-emerald-400 font-bold">
                    ★ {site.rating} ({site.reviewsCount})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedSite(site)}
                    className="flex-1 py-2.5 px-3 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 border border-white/10"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                    <span>Read History</span>
                  </button>

                  <button
                    onClick={() => onBookSitePass({
                      title: `Pilgrim Expedition to ${site.name}`,
                      location: `${site.district}, ${site.region}`,
                      startingPrice: 3500,
                      region: site.region,
                      duration: '2-Day Heritage Darshan'
                    })}
                    className="flex-1 py-2.5 px-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow"
                  >
                    <span>Plan Darshan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Comprehensive History & Darshan Details Modal */}
      {selectedSite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0C1E1B] border border-emerald-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative text-white max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedSite(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white bg-white/10 w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/40">
                {selectedSite.category}
              </span>
              <span className="text-xs text-amber-300 font-mono">
                {selectedSite.builtEra}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
              {selectedSite.name}
            </h3>
            <p className="text-xs text-slate-400 flex items-center gap-1 mt-1 mb-4">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{selectedSite.district}, {selectedSite.region} • Altitude: {selectedSite.altitude}</span>
            </p>

            <div className="rounded-2xl overflow-hidden aspect-video mb-5 border border-white/10">
              <img
                src={selectedSite.image}
                alt={selectedSite.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <strong className="text-amber-300 block text-sm font-serif mb-1">
                  Historical Origin & Sacred Legend
                </strong>
                <p className="text-slate-300 leading-relaxed">
                  {selectedSite.history}
                </p>
              </div>

              <div>
                <strong className="text-emerald-400 block text-sm font-serif mb-1">
                  Architectural Marvel & Shikhara Style
                </strong>
                <p className="text-slate-300 leading-relaxed">
                  <strong>Style:</strong> {selectedSite.architectureStyle}. Built to withstand high-altitude Himalayan seismic shifts and blizzards.
                </p>
              </div>

              <div className="p-3.5 bg-black/40 rounded-2xl border border-white/10 space-y-1.5">
                <div className="text-slate-300">
                  <strong className="text-white">Timings & Aarti:</strong> {selectedSite.timings}
                </div>
                <div className="text-slate-300">
                  <strong className="text-white">Darshan Protocol:</strong> {selectedSite.darshanRules}
                </div>
              </div>

              <div>
                <strong className="text-slate-200 block text-xs uppercase font-bold mb-2">
                  Nearby Shrines & Scenic Trails:
                </strong>
                <div className="flex flex-wrap gap-2">
                  {selectedSite.nearbyHighlights.map((hl, i) => (
                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-xl text-slate-300 text-[11px]">
                      ✦ {hl}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              <span className="text-xs text-slate-400">
                ★ {selectedSite.rating} Rating ({selectedSite.reviewsCount} Pilgrim Reviews)
              </span>

              <button
                onClick={() => {
                  const siteToBook = selectedSite;
                  setSelectedSite(null);
                  onBookSitePass({
                    title: `Pilgrim Pass to ${siteToBook.name}`,
                    location: `${siteToBook.district}, ${siteToBook.region}`,
                    startingPrice: 3500,
                    region: siteToBook.region,
                    duration: '2-Day Heritage Darshan'
                  });
                }}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold rounded-xl text-xs shadow-lg transition"
              >
                Plan Darshan Journey
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
