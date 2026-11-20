import React, { useState } from 'react';
import { Sparkles, Compass, MapPin, Search, Calendar, ShieldCheck, HeartHandshake, Mountain, ArrowRight, Sun, Thermometer, CloudSun } from 'lucide-react';
import { RELIABLE_HIMALAYAN_IMAGES } from '../utils/imageFallback';
import LiveWeatherPill from './LiveWeatherPill';

export default function Hero({ onOpenAIPlanner, onExploreDestinations, onExploreArtisans, onOpenEvents, onOpenPersonalSuggester, onOpenWeatherModal }) {
  const [quickQuery, setQuickQuery] = useState('');

  const quickPicks = [
    'Kedarnath Trek', 'Chopta Tungnath', 'Rishikesh Ganga Aarti', 'Auli Ski Slopes', 'Almora Bal Mithai & Aipan', 'Munsiyari Panchachuli'
  ];

  return (
    <div className="relative bg-[#090E1A] text-white overflow-hidden min-h-[88vh] flex items-center">
      {/* Dynamic Background Image with Depth Gradient Overlays */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 transform duration-1000"
        style={{
          backgroundImage: `url('${RELIABLE_HIMALAYAN_IMAGES.heroBg}')`
        }}
      />
      
      {/* Vignette & Ambient Radial Glows (Midnight Blue & Warm Golden Hour) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#090E1A]/95 via-[#0D1629]/75 to-[#090E1A]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[400px] bg-amber-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[350px] bg-sky-500/15 rounded-full blur-[130px] pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
        
        {/* Floating Live Mountain Weather & Trust Badge */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold shadow-lg">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>SafarNama Uttarakhand • Devbhoomi Reimagined</span>
          </div>

          <div className="hidden sm:inline-flex">
            <LiveWeatherPill onOpenWeatherModal={onOpenWeatherModal} />
          </div>
        </div>

        {/* Main Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-serif tracking-tight leading-[1.1] text-white drop-shadow-md">
            Journey Through Sacred Peaks, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-amber-100">
              Living Heritage & Mountain Masters.
            </span>
          </h1>
          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Connect directly with 4th-gen copper masters in Almora, Bhotia sheep-wool weavers in Munsiyari, and sacred Aipan folk artists. Savor genuine Bal Mithai, witness live evening aartis, and let our <strong>AI Budget Planner</strong> curate your custom Himalayan route.
          </p>
        </div>

        {/* Floating Glass Search & AI Planner Launcher */}
        <div className="mt-10 max-w-3xl mx-auto bg-slate-950/80 backdrop-blur-2xl rounded-3xl p-3 sm:p-4 shadow-2xl border border-amber-500/25 text-slate-100">
          <div className="flex flex-col sm:flex-row items-center gap-2.5">
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 absolute left-4 top-3.5 text-amber-400" />
              <input
                type="text"
                placeholder="Where in Uttarakhand? (e.g. Chopta, Kedarnath, Almora, Auli...)"
                value={quickQuery}
                onChange={(e) => setQuickQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 text-sm bg-black/50 border border-white/10 rounded-2xl focus:ring-2 focus:ring-amber-400 focus:border-transparent text-white placeholder-slate-400 focus:outline-none transition"
              />
            </div>
            
            <div className="flex w-full sm:w-auto gap-2">
              <button
                onClick={() => onExploreDestinations(quickQuery)}
                className="flex-1 sm:flex-initial px-4 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white text-xs sm:text-sm font-bold rounded-2xl transition flex items-center justify-center gap-1.5 shadow-lg shadow-blue-950/50"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Sights</span>
              </button>

              <button
                onClick={onOpenPersonalSuggester || (() => window.location.href = '/personal-suggester')}
                className="flex-1 sm:flex-initial px-4 py-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-600 hover:from-purple-500 hover:to-sky-500 text-white font-extrabold text-xs sm:text-sm rounded-2xl transition flex items-center justify-center gap-1.5 shadow-lg shadow-purple-950/50"
              >
                <span>Personal Suggester 🎯</span>
              </button>

              <button
                onClick={onOpenAIPlanner}
                className="flex-1 sm:flex-initial px-4 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold text-xs sm:text-sm rounded-2xl transition flex items-center justify-center gap-1.5 shadow-lg shadow-amber-950/50"
              >
                <Sparkles className="w-4 h-4 text-slate-950 animate-spin" />
                <span>AI Budget Plan</span>
              </button>
            </div>
          </div>

          {/* Trending Pills */}
          <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Popular Circuits:</span>
            {quickPicks.map((pick, i) => (
              <button
                key={i}
                onClick={() => {
                  setQuickQuery(pick);
                  onExploreDestinations(pick);
                }}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-amber-500/20 hover:text-amber-300 border border-white/5 hover:border-amber-400/30 transition text-slate-300"
              >
                {pick}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Highlights Grid Banner */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto pt-8 border-t border-white/10 text-center">
          <div 
            onClick={onExploreArtisans}
            className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-xl border border-white/10 hover:border-amber-500/40 transition-all duration-300 cursor-pointer group hover:-translate-y-1 shadow-lg"
          >
            <div className="text-3xl mb-1.5 group-hover:scale-110 transition">🎨</div>
            <div className="font-bold text-sm text-white">Local Craftsmen</div>
            <div className="text-xs text-amber-300/80 mt-0.5">Direct Studio Masterclasses & 0% Cut</div>
          </div>

          <div 
            onClick={onExploreDestinations}
            className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-xl border border-white/10 hover:border-amber-500/40 transition-all duration-300 cursor-pointer group hover:-translate-y-1 shadow-lg"
          >
            <div className="text-3xl mb-1.5 group-hover:scale-110 transition">🏔️</div>
            <div className="font-bold text-sm text-white">Famous Locations</div>
            <div className="text-xs text-amber-300/80 mt-0.5">Garhwal & Kumaon Sacred Valleys</div>
          </div>

          <div 
            onClick={onOpenEvents}
            className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-xl border border-white/10 hover:border-amber-500/40 transition-all duration-300 cursor-pointer group hover:-translate-y-1 shadow-lg"
          >
            <div className="text-3xl mb-1.5 group-hover:scale-110 transition">🪔</div>
            <div className="font-bold text-sm text-white">Live Ganga Aarti</div>
            <div className="text-xs text-amber-300/80 mt-0.5">Daily Broadcasts & Cultural Fairs</div>
          </div>

          <div 
            onClick={onOpenAIPlanner}
            className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-xl border border-white/10 hover:border-amber-500/40 transition-all duration-300 cursor-pointer group hover:-translate-y-1 shadow-lg"
          >
            <div className="text-3xl mb-1.5 group-hover:scale-110 transition">⚡</div>
            <div className="font-bold text-sm text-white">AI Budget Planner</div>
            <div className="text-xs text-amber-300/80 mt-0.5">Automated per-diem breakdown</div>
          </div>
        </div>

      </div>
    </div>
  );
}
