import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Landmark, Compass, ShieldCheck, HeartHandshake, MapPin, Sparkles, BookOpen } from 'lucide-react';
import TemplesAndHistorySection from '../components/TemplesAndHistorySection';

export default function TemplesHistoryPage({ sites = [], onBookSitePass }) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#090E1A] text-white min-h-screen">
      
      {/* Hero Banner */}
      <div className="relative pt-12 pb-16 bg-gradient-to-b from-[#0D1528] to-[#090E1A] border-b border-white/10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <Link to="/" className="hover:text-amber-400 transition">Home</Link>
            <span>/</span>
            <span className="text-amber-300 font-semibold">Temples & Historical Places</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Landmark className="w-4 h-4 text-amber-400" />
              Living Antiquity • Land of the Gods
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight leading-tight">
              Sacred Temples & Historical Marvels of Uttarakhand
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Journey through the celestial Jyotirlingas of Kedarnath, the 124 ancient deodar shrines of Jageshwar, the Katyuri spires of Baraditya, Chand royal palaces, and historic cartography observatories.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
            <div className="bg-[#101728] border border-amber-500/20 p-4 rounded-2xl backdrop-blur-md">
              <span className="text-2xl font-bold font-serif text-amber-300">14+ Sites</span>
              <p className="text-xs text-slate-300 mt-1">Sacred Jyotirlingas, Katyuri temples & historic forts</p>
            </div>
            <div className="bg-[#0E2320]/80 border border-emerald-500/20 p-4 rounded-2xl backdrop-blur-md">
              <span className="text-2xl font-bold font-serif text-emerald-300">8th Century</span>
              <p className="text-xs text-slate-300 mt-1">Oldest interlocking stone masonry standing today</p>
            </div>
            <div className="bg-[#0E2320]/80 border border-emerald-500/20 p-4 rounded-2xl backdrop-blur-md">
              <span className="text-2xl font-bold font-serif text-teal-300">3,680m</span>
              <p className="text-xs text-slate-300 mt-1">Highest Shiva temple in the world (Tungnath)</p>
            </div>
            <div className="bg-[#0E2320]/80 border border-emerald-500/20 p-4 rounded-2xl backdrop-blur-md">
              <span className="text-2xl font-bold font-serif text-purple-300">ASI Verified</span>
              <p className="text-xs text-slate-300 mt-1">Protected cultural heritage & sacred sanctums</p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Section */}
      <TemplesAndHistorySection
        sites={sites}
        onLocateOnMap={() => navigate('/map')}
        onBookSitePass={onBookSitePass}
      />

      {/* Sacred Himalayan Pilgrimage Tradition Info Box */}
      <section className="py-16 bg-[#081715] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-2">
              Pilgrim Wisdom & Guidelines
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white">
              Sacred Traditions of the Himalayan Shrines
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
            <div className="p-6 rounded-2xl bg-[#0D221F] border border-white/10 space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>🕉️</span>
                <span>The Panch Kedar Tradition</span>
              </h3>
              <p className="leading-relaxed">
                Lord Shiva's divine form is worshipped across five high-altitude sanctuaries: the hump at <strong>Kedarnath</strong>, arms at <strong>Tungnath</strong>, face at <strong>Rudranath</strong>, navel at <strong>Madhyamaheshwar</strong>, and hair at <strong>Kalpeshwar</strong>.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0D221F] border border-white/10 space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>🏛️</span>
                <span>Katyuri & Nagara Stone Craft</span>
              </h3>
              <p className="leading-relaxed">
                Constructed without cement using dry-stone interlocking granite slabs, temples like Katarmal and Jageshwar have endured Himalayan earthquakes, heavy snow, and centuries of monsoons.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0D221F] border border-white/10 space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>🌿</span>
                <span>Sacred Mountain Etiquette</span>
              </h3>
              <p className="leading-relaxed">
                Maintain silence around sanctum sanctorum, remove leather shoes and accessories before stepping on holy stone flagstones, and practice strict zero-plastic devotion.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
