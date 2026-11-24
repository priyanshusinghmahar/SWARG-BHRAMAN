import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Sparkles, Compass, MapPin, Search, Calendar, ShieldCheck, 
  HeartHandshake, Mountain, ArrowRight, Sun, Thermometer, CloudSun 
} from 'lucide-react';
import { RELIABLE_HIMALAYAN_IMAGES } from '../utils/imageFallback';
import LiveWeatherPill from './LiveWeatherPill';

export default function Hero({ 
  onExploreDestinations, 
  onExploreArtisans, 
  onOpenEvents, 
  onOpenPersonalSuggester, 
  onOpenWeatherModal 
}) {
  const navigate = useNavigate();
  const [quickQuery, setQuickQuery] = useState('');

  const quickPicks = [
    'Char Dham 10D', 'Kedarkantha Snow 5D', 'Chopta Tungnath 4D', 
    'Valley of Flowers 6D', 'Auli Skiing 4D', 'Kumaon Heritage 5D', 'Rishikesh Rafting 3D'
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/tour-plans');
  };

  return (
    <div className="relative bg-white dark:bg-[#070B18] text-slate-900 dark:text-white overflow-hidden w-full transition-colors duration-300">
      
      {/* Majestic Himalayan Mountain Scenic Background (High Visibility & Vibrant in Both Modes) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-85 dark:opacity-80 pointer-events-none transition-opacity duration-500 scale-100"
        style={{
          backgroundImage: `url('${RELIABLE_HIMALAYAN_IMAGES.heroBg}'), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2200&q=80')`
        }}
      />
      
      {/* High-Contrast Alpine Vignette - Keeps Himalayan Snow Peaks Vibrant while Ensuring 100% Content Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white dark:from-[#070B18]/80 dark:via-[#070B18]/55 dark:to-[#070B18] pointer-events-none transition-colors duration-300" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[600px] h-[200px] sm:h-[300px] bg-amber-500/20 dark:bg-amber-500/15 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-4 sm:right-10 w-[70vw] max-w-[400px] h-[180px] sm:h-[250px] bg-orange-500/20 dark:bg-orange-500/15 rounded-full blur-[90px] sm:blur-[130px] pointer-events-none" />

      {/* Hero Content Container - Proportioned compactly to fit 100% inside laptop viewport */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 w-full">
        
        {/* Floating Live Mountain Weather & Trust Badge */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-[#0D1528] border-2 border-slate-200 dark:border-amber-500/40 text-amber-900 dark:text-amber-300 text-[10px] sm:text-xs font-bold shadow-md">
            <img 
              src="/swargbraman-logo.jpg" 
              alt="SwargBhraman Emblem" 
              className="w-3.5 h-3.5 rounded-md object-cover border border-amber-400/60 shadow-sm"
            />
            <span>SwargBhraman Uttarakhand • Devbhoomi Reimagined</span>
          </div>

          <div className="inline-flex scale-85 sm:scale-90 origin-center">
            <LiveWeatherPill onOpenWeatherModal={onOpenWeatherModal} />
          </div>
        </div>

        {/* Main Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto space-y-1">
          <h1 className="text-lg sm:text-2xl md:text-3xl font-extrabold font-serif tracking-tight leading-tight text-slate-950 dark:text-white drop-shadow-sm">
            Book Curated Himalayan Expeditions &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 dark:from-amber-300 dark:via-orange-300 dark:to-amber-100">
              Verified Day-by-Day Sacred Trip Plans.
            </span>
          </h1>
          <p className="text-[10px] sm:text-xs md:text-sm text-slate-700 dark:text-slate-300 max-w-xl mx-auto font-medium leading-normal drop-shadow-sm line-clamp-1 sm:line-clamp-2">
            Guaranteed Char Dham Yatra batches, winter snow summits, certified NIM guides, and instant digital QR passes. Reserve with 25% advance.
          </p>
        </div>

        {/* Compact, 100% Solid Non-Transparent Search & Action Hub */}
        <div className="mt-2 sm:mt-2.5 max-w-2xl mx-auto bg-white dark:bg-[#0B132B] rounded-2xl p-2.5 sm:p-3 shadow-2xl border-2 border-slate-300 dark:border-amber-500/50 text-slate-900 dark:text-slate-100 space-y-2 transition-colors duration-300">
          
          {/* Row 1: Search Form with input and search CTA */}
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-1.5">
            <div className="relative flex-1 w-full">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-amber-600 dark:text-amber-400" />
              <input
                type="text"
                placeholder="Search expeditions (e.g. Kedarnath, Tungnath, Auli, Flowers...)"
                value={quickQuery}
                onChange={(e) => setQuickQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-100 dark:bg-[#060A14] border border-slate-300 dark:border-amber-500/30 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-slate-950 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none transition shadow-inner font-medium"
              />
            </div>
            
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 text-xs font-black rounded-xl transition flex items-center justify-center gap-1.5 shadow-md shadow-amber-950/30 whitespace-nowrap cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Explore Expeditions</span>
            </button>
          </form>

          {/* Row 2: Clean Smart Tools Gateway Buttons (100% Solid, High-Contrast) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1.5 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => navigate('/tour-plans')}
              className="px-2 py-1.5 bg-slate-100 hover:bg-amber-100 dark:bg-[#131F3B] dark:hover:bg-[#1A2A4E] border border-slate-300 dark:border-amber-500/30 text-slate-900 dark:text-amber-300 font-bold text-[10px] sm:text-[11px] rounded-lg transition flex items-center justify-center gap-1 shadow-sm cursor-pointer"
            >
              <span>🧭 Tour Plans</span>
            </button>

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('interactive-map');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else navigate('/map');
              }}
              className="px-2 py-1.5 bg-slate-100 hover:bg-amber-100 dark:bg-[#131F3B] dark:hover:bg-[#1A2A4E] border border-slate-300 dark:border-amber-500/30 text-slate-900 dark:text-amber-300 font-bold text-[10px] sm:text-[11px] rounded-lg transition flex items-center justify-center gap-1 shadow-sm cursor-pointer"
            >
              <span>🗺️ Live GPS Map</span>
            </button>

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('events-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else navigate('/events');
              }}
              className="px-2 py-1.5 bg-slate-100 hover:bg-amber-100 dark:bg-[#131F3B] dark:hover:bg-[#1A2A4E] border border-slate-300 dark:border-amber-500/30 text-slate-900 dark:text-amber-300 font-bold text-[10px] sm:text-[11px] rounded-lg transition flex items-center justify-center gap-1 shadow-sm cursor-pointer"
            >
              <span>🔥 Live Aarti</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/donate')}
              className="px-2 py-1.5 bg-slate-100 hover:bg-amber-100 dark:bg-[#131F3B] dark:hover:bg-[#1A2A4E] border border-slate-300 dark:border-amber-500/30 text-slate-900 dark:text-amber-300 font-bold text-[10px] sm:text-[11px] rounded-lg transition flex items-center justify-center gap-1 shadow-sm cursor-pointer"
            >
              <span>🪔 Seva &amp; Daan</span>
            </button>
          </div>

          {/* Row 3: Popular Circuits Tags */}
          <div className="pt-1 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-1 text-[10px] text-slate-600 dark:text-slate-400">
            <span className="font-bold text-slate-800 dark:text-slate-200 text-[10px]">Popular:</span>
            {quickPicks.slice(0, 5).map((pick, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setQuickQuery(pick);
                  if (onExploreDestinations) onExploreDestinations(pick);
                }}
                className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-amber-100 dark:bg-[#131F3B] dark:hover:bg-amber-500/20 text-slate-800 dark:text-slate-200 hover:text-amber-900 dark:hover:text-amber-300 border border-slate-300 dark:border-slate-700 hover:border-amber-400 transition text-[10px] font-medium"
              >
                {pick}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Highlights Ribbon (100% Solid Cards) */}
        <div className="mt-2 sm:mt-2.5 grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2 max-w-4xl mx-auto pt-1.5 sm:pt-2 border-t border-slate-200 dark:border-slate-800">
          <div 
            onClick={onExploreArtisans || (() => navigate('/artisans'))}
            className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-[#0D1528] hover:bg-slate-50 dark:hover:bg-[#131F3B] border-2 border-slate-200 dark:border-amber-500/30 hover:border-amber-500/60 transition cursor-pointer group shadow-sm text-left"
          >
            <span className="text-lg group-hover:scale-110 transition flex-shrink-0">🎨</span>
            <div className="min-w-0">
              <div className="font-bold text-[11px] sm:text-xs text-slate-950 dark:text-white truncate font-serif">Local Craftsmen</div>
              <div className="text-[9px] sm:text-[10px] text-amber-700 dark:text-amber-300 truncate font-semibold">Studio Passes &amp; 0% Cut</div>
            </div>
          </div>

          <div 
            onClick={onExploreDestinations || (() => navigate('/destinations'))}
            className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-[#0D1528] hover:bg-slate-50 dark:hover:bg-[#131F3B] border-2 border-slate-200 dark:border-amber-500/30 hover:border-amber-500/60 transition cursor-pointer group shadow-sm text-left"
          >
            <span className="text-lg group-hover:scale-110 transition flex-shrink-0">🏔️</span>
            <div className="min-w-0">
              <div className="font-bold text-[11px] sm:text-xs text-slate-950 dark:text-white truncate font-serif">Famous Locations</div>
              <div className="text-[9px] sm:text-[10px] text-amber-700 dark:text-amber-300 truncate font-semibold">Garhwal &amp; Kumaon Valleys</div>
            </div>
          </div>

          <div 
            onClick={onOpenEvents || (() => navigate('/events'))}
            className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-[#0D1528] hover:bg-slate-50 dark:hover:bg-[#131F3B] border-2 border-slate-200 dark:border-amber-500/30 hover:border-amber-500/60 transition cursor-pointer group shadow-sm text-left"
          >
            <span className="text-lg group-hover:scale-110 transition flex-shrink-0">🪔</span>
            <div className="min-w-0">
              <div className="font-bold text-[11px] sm:text-xs text-slate-950 dark:text-white truncate font-serif">Live Ganga Aarti</div>
              <div className="text-[9px] sm:text-[10px] text-amber-700 dark:text-amber-300 truncate font-semibold">Daily Streams &amp; Fairs</div>
            </div>
          </div>

          <div 
            onClick={onOpenPersonalSuggester || (() => navigate('/personal-suggester'))}
            className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-[#0D1528] hover:bg-slate-50 dark:hover:bg-[#131F3B] border-2 border-slate-200 dark:border-amber-500/30 hover:border-amber-500/60 transition cursor-pointer group shadow-sm text-left"
          >
            <span className="text-lg group-hover:scale-110 transition flex-shrink-0">🎯</span>
            <div className="min-w-0">
              <div className="font-bold text-[11px] sm:text-xs text-slate-950 dark:text-white truncate font-serif">Soul Suggester</div>
              <div className="text-[9px] sm:text-[10px] text-amber-700 dark:text-amber-300 truncate font-semibold">Vibe &amp; Personality Quiz</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
