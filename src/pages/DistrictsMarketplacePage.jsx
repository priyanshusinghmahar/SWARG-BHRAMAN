import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, Award, HeartHandshake, MapPin, Truck, Sparkles, CheckCircle2 } from 'lucide-react';
import DistrictsHaatSection from '../components/DistrictsHaatSection';

export default function DistrictsMarketplacePage({ 
  districtsData = [], 
  onBuyProduct 
}) {
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
            <span className="text-amber-300 font-semibold">13 Districts Famous Haat</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              13 Districts • 100% Authentic Indigenous Produce
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight leading-tight">
              Famous Things of Every District in Uttarakhand
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              From Almora's 160-year-old Bal Mithai and Munsiyari's snow rajma to Dehradun's aged Basmati and Lohaghat's hand-forged iron cookware. Purchase genuine GI-tagged specialties directly through us with zero middlemen.
            </p>
          </div>

          {/* District Highlights Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 text-xs">
            <div className="bg-[#101728] border border-amber-500/20 p-4 rounded-2xl backdrop-blur-md">
              <span className="text-2xl font-bold font-serif text-amber-300">13 Districts</span>
              <p className="text-slate-300 mt-1">Every district specialty curated directly with local guilds</p>
            </div>
            <div className="bg-[#0E2320]/80 border border-emerald-500/20 p-4 rounded-2xl backdrop-blur-md">
              <span className="text-2xl font-bold font-serif text-emerald-300">GI Certified</span>
              <p className="text-slate-300 mt-1">Geographical Indication verified authentic mountain produce</p>
            </div>
            <div className="bg-[#0E2320]/80 border border-emerald-500/20 p-4 rounded-2xl backdrop-blur-md">
              <span className="text-2xl font-bold font-serif text-teal-300">100% Direct</span>
              <p className="text-slate-300 mt-1">Zero intermediary commission; funds go directly to village SHGs</p>
            </div>
            <div className="bg-[#0E2320]/80 border border-emerald-500/20 p-4 rounded-2xl backdrop-blur-md">
              <span className="text-2xl font-bold font-serif text-purple-300">Pan-India</span>
              <p className="text-slate-300 mt-1">Himalayan Speed Post doorstep delivery in 3-5 days</p>
            </div>
          </div>

        </div>
      </div>

      {/* Main District Haat Section */}
      <DistrictsHaatSection
        districtsData={districtsData}
        onBuyProduct={onBuyProduct}
      />

    </div>
  );
}
